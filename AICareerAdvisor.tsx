import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { createCareerChat, sendMessageToGemini } from '../services/geminiService';
import { Chat } from '@google/genai';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RECOMMENDATION_DATA = [
  { name: '자소서/서류', value: 35 },
  { name: '면접/실전', value: 25 },
  { name: '직무 멘토링', value: 20 },
  { name: '해외 취업', value: 10 },
  { name: '기타', value: 10 },
];
const COLORS = ['#0E4A84', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AICareerAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '안녕하세요! 한양대학교 커리어개발팀 AI 챗봇입니다. 진로 고민이나 취업 프로그램에 대해 무엇이든 물어보세요. (예: "3학년에게 추천하는 프로그램은?", "면접 준비는 어떻게 할까요?")',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatInstance.current = createCareerChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatInstance.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(chatInstance.current, userMsg.text);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
      {/* Left: Stats & Info Panel */}
      <div className="hidden lg:flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-500" size={20} />
            프로그램 참여 트렌드
          </h3>
          <p className="text-sm text-gray-500 mb-6">지난 학기 학생들이 가장 많이 찾은 취업 지원 분야입니다.</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RECOMMENDATION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {RECOMMENDATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-auto">
          <h4 className="font-semibold text-blue-900 mb-2">💡 팁</h4>
          <p className="text-sm text-blue-800">
            구체적인 학년과 희망 직무를 말씀해 주시면 더 정확한 프로그램을 추천해 드릴 수 있습니다.
          </p>
        </div>
      </div>

      {/* Right: Chat Interface */}
      <div className="lg:col-span-2 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-hy-blue text-white flex items-center gap-3">
          <Bot size={28} />
          <div>
            <h2 className="font-bold text-lg">AI 커리어 챗봇</h2>
            <p className="text-sm text-blue-200">Powered by Gemini 2.5</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-gray-600' : 'bg-hy-blue'
              }`}>
                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
              </div>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-base leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-gray-800 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
             <div className="w-10 h-10 rounded-full bg-hy-blue flex items-center justify-center shrink-0">
               <Bot size={20} className="text-white" />
             </div>
             <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
               <Loader2 className="animate-spin text-hy-blue" size={24} />
             </div>
           </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="궁금한 점을 입력하세요..."
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-hy-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};