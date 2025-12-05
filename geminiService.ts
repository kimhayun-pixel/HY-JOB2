import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MOCK_PROGRAMS } from '../constants';

const apiKey = process.env.API_KEY || '';

// Safely initialize client only if key exists, but handle missing key gracefully in UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const createCareerChat = (): Chat | null => {
  if (!ai) return null;

  // Contextualize the AI with the current program data
  const programContext = MOCK_PROGRAMS.map(p => 
    `- [${p.status}] ${p.title} (Category: ${p.category}): ${p.description}. Target: ${p.targetAudience}. Apply by: ${new Date(p.applicationPeriod.end).toLocaleDateString()}.`
  ).join('\n');

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `
        You are an expert Career Advisor at Hanyang University's Career Development Team.
        Your goal is to help students find the right career programs and answer their career-related questions.
        
        Use the following list of current programs to recommend specific activities:
        ${programContext}

        Tone: Professional, encouraging, and helpful (University staff persona).
        Language: Korean (Hangul).
        
        If a student asks about a program not in the list, suggest they check the official website or recommend a similar existing program if available.
        Keep answers concise and actionable.
      `,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "죄송합니다. 답변을 생성하는 중 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "현재 AI 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";
  }
};