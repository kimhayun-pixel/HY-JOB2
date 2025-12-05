
import React, { useState, useMemo } from 'react';
import { MOCK_PROGRAMS, ALL_TAGS } from './constants';
import { ProgramStatus } from './types';
import { ProgramCard } from './components/ProgramCard';
import { CalendarView } from './components/CalendarView';
import { AICareerAdvisor } from './components/AICareerAdvisor';
import { NoticeBoard } from './components/NoticeBoard';
import { InquiryView } from './components/InquiryView';
import { LayoutGrid, Calendar as CalendarIcon, MessageSquareText, Megaphone, HelpCircle } from 'lucide-react';

type Tab = 'list' | 'calendar' | 'ai' | 'notice' | 'inquiry';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const [selectedTag, setSelectedTag] = useState<string>('전체');

  // Calculate available tags from currently active programs
  const availableTags = useMemo(() => {
    // Get all tags used in programs
    const usedTags = new Set<string>();
    MOCK_PROGRAMS.forEach(p => {
      p.tags.forEach(tag => usedTags.add(tag));
    });

    // Filter the master list to strictly follow the order and existence of the provided list
    // Only include tags that are actually used by at least one program
    return ['전체', ...ALL_TAGS.filter(tag => usedTags.has(tag))];
  }, []);

  // Filter and Sort programs
  const filteredPrograms = useMemo(() => {
    let programs = selectedTag === '전체' 
      ? [...MOCK_PROGRAMS] 
      : MOCK_PROGRAMS.filter(p => p.tags.includes(selectedTag));

    // Sort Order: ONGOING -> OPEN -> UPCOMING -> CLOSED
    const statusPriority = {
      [ProgramStatus.ONGOING]: 0,
      [ProgramStatus.OPEN]: 1,
      [ProgramStatus.UPCOMING]: 2,
      [ProgramStatus.CLOSED]: 3,
    };

    return programs.sort((a, b) => {
      return statusPriority[a.status] - statusPriority[b.status];
    });
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            {/* Mascot Image - Hy-Lion */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Hanyang_Univ_Mascot_Hylion.png/240px-Hanyang_Univ_Mascot_Hylion.png" 
              alt="Hanyang Hy-Lion" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-wider">HANYANG UNIVERSITY</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900 leading-none">커리어개발팀</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LayoutGrid size={18} />
              <span className="hidden lg:inline">프로그램</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <CalendarIcon size={18} />
              <span className="hidden lg:inline">캘린더</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'ai' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <MessageSquareText size={18} />
              <span className="hidden lg:inline">AI 상담</span>
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
            <button
              onClick={() => setActiveTab('notice')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'notice' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Megaphone size={18} />
              <span className="hidden lg:inline">공지사항</span>
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'inquiry' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <HelpCircle size={18} />
              <span className="hidden lg:inline">문의하기</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        {/* Category Filters (Only Visible for List and Calendar tabs) */}
        {(activeTab === 'list' || activeTab === 'calendar') && (
          <div className="mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            <div className="flex gap-2 min-w-max">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md transform scale-105'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {selectedTag === '전체' ? '진행중인 프로그램' : `'${selectedTag}' 관련 프로그램`}
              </h2>
              <span className="text-sm text-gray-500">
                총 {filteredPrograms.length}개
              </span>
            </div>
            
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPrograms.map(program => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">해당 태그의 프로그램이 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                 {selectedTag === '전체' ? '월별 일정' : `'${selectedTag}' 일정`}
              </h2>
            </div>
            <CalendarView programs={filteredPrograms} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">AI 취업 상담</h2>
            </div>
            <AICareerAdvisor />
          </div>
        )}

        {activeTab === 'notice' && (
          <div className="space-y-6">
            <NoticeBoard />
          </div>
        )}

        {activeTab === 'inquiry' && (
          <div className="space-y-6">
            <InquiryView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-1">
              <p className="text-base text-gray-800 font-bold">한양대학교 서울캠퍼스 │ 학생인재개발처 커리어개발팀</p>
              <p className="text-sm text-gray-500">서울특별시 성동구 왕십리로 222 한양대학교 학생회관 2층</p>
              <p className="text-sm text-gray-500">Tel: 02-2220-0093 │ job@hanyang.ac.kr</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-hy-blue transition-colors text-sm">개인정보처리방침</a>
              <a href="#" className="text-gray-400 hover:text-hy-blue transition-colors text-sm">이용약관</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
