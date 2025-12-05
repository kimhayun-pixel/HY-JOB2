
import React from 'react';
import { MOCK_NOTICES } from '../constants';
import { Megaphone, Search } from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header & Search */}
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="text-blue-600" size={24} />
            공지사항
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            커리어개발팀의 주요 소식과 안내사항을 확인하세요.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="제목 또는 내용 검색" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <th className="py-4 px-6 font-semibold w-20 text-center">번호</th>
              <th className="py-4 px-6 font-semibold w-24 text-center">분류</th>
              <th className="py-4 px-6 font-semibold">제목</th>
              <th className="py-4 px-6 font-semibold w-32 text-center">작성자</th>
              <th className="py-4 px-6 font-semibold w-32 text-center">작성일</th>
              <th className="py-4 px-6 font-semibold w-20 text-center">조회</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {MOCK_NOTICES.map((notice, index) => (
              <tr 
                key={notice.id} 
                className={`border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer ${
                  notice.isImportant ? 'bg-blue-50/50' : ''
                }`}
              >
                <td className="py-4 px-6 text-center">
                  {notice.isImportant ? (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold">중요</span>
                  ) : (
                    MOCK_NOTICES.length - index
                  )}
                </td>
                <td className="py-4 px-6 text-center text-gray-500">{notice.category}</td>
                <td className="py-4 px-6 font-medium text-gray-900">
                  {notice.title}
                </td>
                <td className="py-4 px-6 text-center text-gray-500">{notice.author}</td>
                <td className="py-4 px-6 text-center text-gray-500">{notice.date}</td>
                <td className="py-4 px-6 text-center text-gray-500">{notice.views}</td>
              </tr>
            ))}
            {/* Empty Rows Filler (Optional) */}
            {MOCK_NOTICES.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Visual Only) */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <div className="flex gap-1">
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm" disabled>&lt;</button>
          <button className="px-3 py-1 rounded border border-blue-500 bg-blue-500 text-white text-sm">1</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">2</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">3</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">&gt;</button>
        </div>
      </div>
    </div>
  );
};
