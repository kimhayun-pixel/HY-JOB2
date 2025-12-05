import React, { useState, useMemo } from 'react';
import { Program, ProgramStatus } from '../types';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Calendar as CalendarIcon, FileText, ExternalLink } from 'lucide-react';

interface Props {
  programs: Program[];
}

export const CalendarView: React.FC<Props> = ({ programs }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Helper to format date range for display
  const formatDateRange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    return `${s.getMonth() + 1}.${s.getDate()} ~ ${e.getMonth() + 1}.${e.getDate()}`;
  };

  // --- Grid View Logic ---
  const isDateInRange = (dateStr: string, startIso: string, endIso: string) => {
    const d = new Date(dateStr).setHours(0,0,0,0);
    const s = new Date(startIso).setHours(0,0,0,0);
    const e = new Date(endIso).setHours(0,0,0,0);
    return d >= s && d <= e;
  };

  const gridCells = useMemo(() => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const cells = [];

    // Empty cells
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border-b border-r border-gray-100" />);
    }

    // Days
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = new Date(currentYear, currentMonth, day).toDateString();
      const daysPrograms = programs.filter(p => {
        const isApp = isDateInRange(dateStr, p.applicationPeriod.start, p.applicationPeriod.end);
        const isEvent = isDateInRange(dateStr, p.eventPeriod.start, p.eventPeriod.end);
        return isApp || isEvent;
      });

      const isToday = new Date().toDateString() === dateStr;

      cells.push(
        <div key={day} className="h-28 sm:h-36 bg-white border-b border-r border-gray-200 p-1 sm:p-2 overflow-hidden hover:bg-blue-50 transition-colors relative">
          <span className={`text-xs font-semibold inline-block w-6 h-6 text-center leading-6 rounded-full ${
             isToday ? 'bg-blue-600 text-white' : 'text-gray-700'
          }`}>{day}</span>
          
          <div className="mt-1 flex flex-col gap-1 overflow-y-auto max-h-[calc(100%-28px)] custom-scrollbar">
            {daysPrograms.map(p => {
               const isEventDay = isDateInRange(dateStr, p.eventPeriod.start, p.eventPeriod.end);
               return (
                <div key={`${day}-${p.id}`} className={`text-[10px] truncate px-1 py-0.5 rounded leading-tight ${
                  isEventDay ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {isEventDay ? '진행' : '신청'} {p.title}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return cells;
  }, [currentDate, programs, currentYear, currentMonth]);


  // --- Timeline View Logic ---
  const CELL_WIDTH = 45; // slightly narrower
  
  const timelineData = useMemo(() => {
    const daysCount = daysInMonth(currentDate);
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);
    
    // Calculate layout for each program bar
    const rows = programs.map(program => {
        // Calculate ranges relative to this month
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth, daysCount, 23, 59, 59);

        const getBarPosition = (startIso: string, endIso: string) => {
            const start = new Date(startIso);
            const end = new Date(endIso);

            // Check overlap
            if (end < monthStart || start > monthEnd) return null;

            const effectiveStart = start < monthStart ? monthStart : start;
            const effectiveEnd = end > monthEnd ? monthEnd : end;

            const startIndex = effectiveStart.getDate() - 1;
            const durationDays = Math.floor((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            return {
                left: startIndex * CELL_WIDTH,
                width: durationDays * CELL_WIDTH,
                originalStart: start,
                originalEnd: end
            };
        };

        return {
            program,
            appBar: getBarPosition(program.applicationPeriod.start, program.applicationPeriod.end),
            eventBar: getBarPosition(program.eventPeriod.start, program.eventPeriod.end)
        };
    });

    return { days, rows };
  }, [currentDate, programs, currentYear, currentMonth]);


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[800px]">
      {/* Header Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border-b border-gray-200 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CalendarIcon className="text-blue-600" size={20} />
            {currentYear}년 {currentMonth + 1}월 일정
          </h2>
          <div className="flex bg-white rounded-lg border border-gray-300 p-0.5">
            <button 
                onClick={handlePrevMonth} 
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                aria-label="Previous Month"
            >
                <ChevronLeft size={18} />
            </button>
            <button 
                onClick={handleNextMonth} 
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                aria-label="Next Month"
            >
                <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex bg-gray-200 p-1 rounded-lg self-center sm:self-auto">
            <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'timeline' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                <List size={16} />
                <span className="hidden sm:inline">일별 일정 (Timeline)</span>
            </button>
            <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">월별 달력 (Grid)</span>
            </button>
        </div>
      </div>

      {/* View Content */}
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'grid' ? (
             <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-7 border-b border-gray-200 text-center text-xs font-medium text-gray-500 bg-gray-50 sticky top-0 z-10 shadow-sm">
                    {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                    <div key={d} className={`py-3 ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : ''}`}>{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 border-l border-gray-200">
                    {gridCells}
                </div>
            </div>
        ) : (
            <div className="flex flex-col h-full">
                {/* Timeline Header - Sticky Top */}
                <div className="flex border-b border-gray-300 bg-gray-100 z-20">
                    <div className="w-[120px] sm:w-[260px] shrink-0 p-2 text-xs font-bold text-gray-700 flex items-center justify-center border-r border-gray-300 bg-gray-50">
                        취업 프로그램 운영 현황
                    </div>
                    {/* The days header is below in the scroll area */}
                </div>

                {/* Main Scrollable Area for Timeline */}
                <div className="flex-1 overflow-auto relative custom-scrollbar">
                     <div className="min-w-max">
                        {/* Header Row (Days) */}
                        <div className="flex sticky top-0 z-30 shadow-sm">
                            <div className="w-[120px] sm:w-[260px] shrink-0 bg-gray-100 border-r border-b border-gray-300 flex">
                                <div className="flex-1 p-2 flex items-center justify-center text-xs font-bold text-gray-600 border-r border-gray-200">
                                    프로그램명
                                </div>
                                <div className="w-14 sm:w-20 p-2 flex items-center justify-center text-xs font-bold text-gray-600">
                                    링크
                                </div>
                            </div>
                            <div className="flex bg-gray-50 border-b border-gray-300">
                                {timelineData.days.map(day => {
                                    const date = new Date(currentYear, currentMonth, day);
                                    const dayOfWeek = date.getDay();
                                    const colorClass = dayOfWeek === 0 ? 'bg-red-50 text-red-600' : dayOfWeek === 6 ? 'bg-blue-50 text-blue-600' : 'text-gray-600';
                                    const dayName = ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek];

                                    return (
                                        <div key={day} className={`shrink-0 border-r border-gray-200 flex flex-col items-center justify-center ${colorClass}`} style={{ width: CELL_WIDTH }}>
                                            <span className="text-[10px]">{dayName}</span>
                                            <span className="text-xs font-bold">{day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Program Rows */}
                        {timelineData.rows.map((row, idx) => (
                            <div key={row.program.id} className="flex border-b border-gray-200 hover:bg-gray-50 group min-h-[4rem]">
                                {/* Left Sticky Column */}
                                <div className="sticky left-0 z-20 w-[120px] sm:w-[260px] shrink-0 bg-white group-hover:bg-gray-50 border-r border-gray-200 flex shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                    <div className="flex-1 p-2 text-xs font-medium text-gray-800 flex items-center border-r border-gray-100">
                                        <span className="line-clamp-2" title={row.program.title}>
                                           {idx + 1}. {row.program.title}
                                        </span>
                                    </div>
                                    <div className="w-14 sm:w-20 p-1 flex flex-col justify-center gap-1.5 text-[10px]">
                                        {row.program.posterUrl && (
                                            <a href={row.program.posterUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 justify-center sm:justify-start">
                                                <FileText size={12} className="shrink-0" /> <span className="hidden sm:inline">포스터</span>
                                            </a>
                                        )}
                                        {row.program.externalLink && (
                                            <a href={row.program.externalLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 justify-center sm:justify-start">
                                                <ExternalLink size={12} className="shrink-0" /> <span className="hidden sm:inline">신청</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Timeline Grid Column */}
                                <div className="relative flex h-16 sm:h-20">
                                    {/* Grid Lines */}
                                    {timelineData.days.map(day => (
                                        <div key={day} className="shrink-0 border-r border-gray-100 h-full" style={{ width: CELL_WIDTH }} />
                                    ))}

                                    {/* Application Period Bar */}
                                    {row.appBar && (
                                        <div 
                                            className="absolute top-2 h-5 sm:h-6 bg-gray-200 border border-gray-300 rounded shadow-sm flex items-center px-1.5 overflow-hidden whitespace-nowrap z-10 hover:z-20 hover:shadow-md transition-all"
                                            style={{ left: row.appBar.left, width: row.appBar.width }}
                                            title={`신청: ${formatDateRange(row.program.applicationPeriod.start, row.program.applicationPeriod.end)}`}
                                        >
                                            <span className="text-[10px] sm:text-xs text-gray-700 font-medium">
                                                [신청] ~{new Date(row.program.applicationPeriod.end).getMonth() + 1}.{new Date(row.program.applicationPeriod.end).getDate()}
                                            </span>
                                        </div>
                                    )}

                                    {/* Event Period Bar */}
                                    {row.eventBar && (
                                        <div 
                                            className="absolute top-8 sm:top-10 h-5 sm:h-6 bg-red-100 border border-red-200 rounded shadow-sm flex items-center px-1.5 overflow-hidden whitespace-nowrap z-10 hover:z-20 hover:shadow-md transition-all"
                                            style={{ left: row.eventBar.left, width: row.eventBar.width }}
                                            title={`진행: ${formatDateRange(row.program.eventPeriod.start, row.program.eventPeriod.end)}`}
                                        >
                                            <span className="text-[10px] sm:text-xs text-red-800 font-medium">
                                                [진행] {new Date(row.program.eventPeriod.start).getMonth()+1}.{new Date(row.program.eventPeriod.start).getDate()}~
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {timelineData.rows.length === 0 && (
                             <div className="p-8 text-center text-gray-500 text-xs">
                                이번 달에 표시할 프로그램이 없습니다.
                             </div>
                        )}
                     </div>
                </div>
                
                {/* Legend */}
                <div className="p-3 bg-gray-50 border-t border-gray-200 flex gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-4 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-[10px]">신청 기간</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-4 bg-red-100 border border-red-200 rounded flex items-center justify-center text-[10px]">진행 기간</div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};