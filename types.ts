
export enum ProgramStatus {
  UPCOMING = '진행 예정',
  OPEN = '신청 가능',
  CLOSED = '마감',
  ONGOING = '진행 중'
}

export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[]; // Added tags for filtering
  targetAudience: string; // 참여 대상
  applicationPeriod: {
    start: string; // ISO Date string
    end: string;
  };
  eventPeriod: {
    start: string;
    end: string;
  };
  method: string; // 참여 방법 (Online/Offline)
  location?: string;
  posterUrl: string;
  externalLink: string;
  status: ProgramStatus;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Notice {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  isImportant?: boolean;
  views: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
