
import React, { useState } from 'react';
import { MOCK_FAQS } from '../constants';
import { HelpCircle, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';

export const InquiryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'form'>('faq');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub Navigation */}
      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-full border border-gray-200 inline-flex shadow-sm">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'faq'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            자주 묻는 질문 (FAQ)
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            1:1 문의하기
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'faq' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="text-blue-600" size={24} />
              자주 묻는 질문
            </h2>
            <p className="text-sm text-gray-500 mt-1">학생들이 가장 많이 궁금해하는 질문들을 모았습니다.</p>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_FAQS.map((faq) => (
              <div key={faq.id} className="group">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-start justify-between bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-bold text-blue-600 mb-1 block">{faq.category}</span>
                    <h3 className={`font-medium text-gray-900 transition-colors ${openFaqId === faq.id ? 'text-blue-700' : ''}`}>
                      Q. {faq.question}
                    </h3>
                  </div>
                  <div className="mt-1">
                    {openFaqId === faq.id ? (
                      <ChevronUp className="text-blue-500" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </div>
                </button>
                {openFaqId === faq.id && (
                  <div className="px-6 pb-6 pt-2 bg-gray-50">
                    <div className="text-sm text-gray-700 leading-relaxed pl-3 border-l-2 border-blue-200">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="text-blue-600" size={24} />
              1:1 문의하기
            </h2>
            <p className="text-sm text-gray-500 mt-1">궁금한 점을 남겨주시면 담당자가 확인 후 답변드립니다.</p>
          </div>
          
          <div className="p-6 md:p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">학번</label>
                  <input
                    type="text"
                    id="studentId"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="2024000000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="hanyang@hanyang.ac.kr"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">문의 유형</label>
                <select
                  id="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option>프로그램 신청/취소</option>
                  <option>마일리지/수료증</option>
                  <option>진로 상담</option>
                  <option>사이트 이용 장애</option>
                  <option>기타</option>
                </select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
                <textarea
                  id="content"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  placeholder="문의 내용을 상세히 작성해주세요."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Send size={18} />
                  문의 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
