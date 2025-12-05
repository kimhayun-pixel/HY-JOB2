import React from 'react';
import { Program, ProgramStatus } from '../types';
import { Calendar, Users, MapPin, MousePointerClick } from 'lucide-react';

interface Props {
  program: Program;
}

const getStatusColor = (status: ProgramStatus) => {
  switch (status) {
    case ProgramStatus.OPEN: return 'bg-blue-600 text-white';
    case ProgramStatus.UPCOMING: return 'bg-yellow-500 text-white';
    case ProgramStatus.ONGOING: return 'bg-green-600 text-white';
    case ProgramStatus.CLOSED: return 'bg-gray-400 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const ProgramCard: React.FC<Props> = ({ program }) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-200 group">
        <img 
          src={program.posterUrl} 
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(program.status)}`}>
          {program.status}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {program.tags.slice(0, 3).map((tag, i) => (
             <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
               {tag}
             </span>
          ))}
          {program.tags.length > 3 && (
             <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
               +{program.tags.length - 3}
             </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">{program.title}</h3>
        <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-1 leading-relaxed">{program.description}</p>
        
        <div className="space-y-2.5 text-sm text-gray-600 mb-5">
          <div className="flex items-center gap-2.5">
            <Calendar size={16} className="text-blue-600 shrink-0" />
            <span>신청: {formatDate(program.applicationPeriod.start)} ~ {formatDate(program.applicationPeriod.end)}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users size={16} className="text-blue-600 shrink-0" />
            <span className="truncate">대상: {program.targetAudience}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-blue-600 shrink-0" />
            <span className="truncate">장소: {program.location || program.method}</span>
          </div>
        </div>

        <a 
          href={program.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-colors ${
            program.status === ProgramStatus.CLOSED 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-hy-blue text-white hover:bg-blue-800'
          }`}
          onClick={(e) => program.status === ProgramStatus.CLOSED && e.preventDefault()}
        >
          {program.status === ProgramStatus.CLOSED ? '신청 마감' : '신청하기'}
          {program.status !== ProgramStatus.CLOSED && <MousePointerClick size={16} />}
        </a>
      </div>
    </div>
  );
};