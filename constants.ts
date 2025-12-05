
import { Program, ProgramStatus, Notice, FAQ } from './types';

// Helper to get dates relative to today
const today = new Date();
const addDays = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Full list of tags as requested (for reference/validation if needed)
export const ALL_TAGS = [
  '자기소개서', '면접', '대기업 필기 · 직무적성검사', '공기업 NCS · PSAT', '1:1 컨설팅',
  '직무 탐색', '대학원 진학', '전문 컨설턴트', '졸업 선배 멘토링', '현직자 Q&A',
  '직무부트캠프', '취업 콘텐츠', 'AI역량검사', '생성형 AI 활용', '온라인',
  '오프라인', '대기업 · 사기업', '공기업 · 공공기관', '전문직', '금융권', '외국계', '기타'
];

export const MOCK_PROGRAMS: Program[] = [
  {
    id: '1',
    title: '2024 하반기 대기업 대비 모의면접',
    description: '실제 인사담당자 출신 멘토들과 함께하는 실전 모의면접 프로그램입니다. 직무별 맞춤형 피드백을 제공합니다.',
    category: '면접/실전',
    tags: ['면접', '대기업 · 사기업', '오프라인', '전문 컨설턴트'],
    targetAudience: '3~4학년 재학생 및 졸업예정자',
    applicationPeriod: {
      start: addDays(-5),
      end: addDays(2),
    },
    eventPeriod: {
      start: addDays(5),
      end: addDays(7),
    },
    method: '오프라인 (HIT 6층)',
    location: 'HIT 6층 대회의실',
    posterUrl: 'https://picsum.photos/400/600?random=1',
    externalLink: 'https://hyu.ac.kr/career/interview',
    status: ProgramStatus.OPEN,
  },
  {
    id: '2',
    title: '동문 선배 멘토링: 반도체 직무 특강',
    description: 'SK하이닉스, 삼성전자 재직 동문 선배가 들려주는 현장 이야기와 취업 준비 꿀팁.',
    category: '멘토링/특강',
    tags: ['졸업 선배 멘토링', '직무 탐색', '대기업 · 사기업', '온라인'],
    targetAudience: '전학년 (이공계 추천)',
    applicationPeriod: {
      start: addDays(-10),
      end: addDays(-1),
    },
    eventPeriod: {
      start: addDays(0), // Today
      end: addDays(0),
    },
    method: '온라인 (Zoom)',
    posterUrl: 'https://picsum.photos/400/600?random=2',
    externalLink: 'https://hyu.ac.kr/career/mentoring',
    status: ProgramStatus.ONGOING,
  },
  {
    id: '3',
    title: 'AI 활용 자기소개서 작성 워크숍',
    description: '생성형 AI를 활용하여 나만의 경험을 구조화하고 매력적인 자기소개서를 작성하는 방법을 배웁니다.',
    category: '자소서/서류',
    tags: ['자기소개서', '생성형 AI 활용', '오프라인', '취업 콘텐츠'],
    targetAudience: '전학년',
    applicationPeriod: {
      start: addDays(1),
      end: addDays(10),
    },
    eventPeriod: {
      start: addDays(15),
      end: addDays(15),
    },
    method: '오프라인 (제2공학관)',
    location: '제2공학관 PC실',
    posterUrl: 'https://picsum.photos/400/600?random=3',
    externalLink: 'https://hyu.ac.kr/career/ai-resume',
    status: ProgramStatus.UPCOMING,
  },
  {
    id: '4',
    title: 'Global Career Week: 해외취업 설명회',
    description: '미국, 일본, 싱가포르 해외 취업 트렌드 및 영문 이력서(Resume) 작성법 특강.',
    category: '해외취업',
    tags: ['외국계', '취업 콘텐츠', '온라인', '오프라인'],
    targetAudience: '해외취업 희망자',
    applicationPeriod: {
      start: addDays(-20),
      end: addDays(-5),
    },
    eventPeriod: {
      start: addDays(-2),
      end: addDays(0),
    },
    method: '온라인/오프라인 병행',
    location: '백남학술정보관',
    posterUrl: 'https://picsum.photos/400/600?random=4',
    externalLink: 'https://hyu.ac.kr/career/global',
    status: ProgramStatus.CLOSED,
  },
  {
    id: '5',
    title: 'NCS 기반 공기업 합격 전략',
    description: '공공기관 채용 트렌드 분석 및 NCS 직업기초능력 필기 준비 전략.',
    category: '공기업/필기',
    tags: ['공기업 · 공공기관', '공기업 NCS · PSAT', '온라인'],
    targetAudience: '전학년',
    applicationPeriod: {
      start: addDays(-2),
      end: addDays(5),
    },
    eventPeriod: {
      start: addDays(10),
      end: addDays(10),
    },
    method: '온라인 (LMS)',
    posterUrl: 'https://picsum.photos/400/600?random=5',
    externalLink: 'https://hyu.ac.kr/career/ncs',
    status: ProgramStatus.OPEN,
  }
];

export const MOCK_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: '[중요] 2024학년도 하반기 취업 프로그램 통합 안내',
    category: '공지',
    author: '커리어개발팀',
    date: '2024.11.01',
    isImportant: true,
    views: 1250,
  },
  {
    id: 'n2',
    title: '[모집] 커리어개발팀 서포터즈 5기 모집 (~11/30)',
    category: '모집',
    author: '커리어개발팀',
    date: '2024.11.10',
    isImportant: true,
    views: 890,
  },
  {
    id: 'n3',
    title: 'HY-CDP 시스템 점검 안내 (12/01 00:00~06:00)',
    category: '시스템',
    author: '관리자',
    date: '2024.11.20',
    isImportant: false,
    views: 340,
  },
  {
    id: 'n4',
    title: 'AI 역량검사 튜토리얼 영상 업로드 안내',
    category: '안내',
    author: '커리어개발팀',
    date: '2024.11.15',
    isImportant: false,
    views: 560,
  },
  {
    id: 'n5',
    title: '외국계 기업 영문 이력서 가이드북 배포',
    category: '자료',
    author: '커리어개발팀',
    date: '2024.11.12',
    isImportant: false,
    views: 720,
  }
];

export const MOCK_FAQS: FAQ[] = [
  {
    id: 'f1',
    category: '프로그램 신청',
    question: '프로그램 신청 취소는 어떻게 하나요?',
    answer: 'HY-CDP 포털 로그인 후 [마이페이지] > [신청 내역]에서 해당 프로그램을 선택하여 취소할 수 있습니다. 프로그램 시작 24시간 전까지만 취소 가능합니다.',
  },
  {
    id: 'f2',
    category: '수료 기준',
    question: '비교과 마일리지는 언제 적립되나요?',
    answer: '프로그램 종료 후 만족도 조사를 완료하시면 7일 이내에 일괄 적립됩니다.',
  },
  {
    id: 'f3',
    category: '상담',
    question: '1:1 진로 상담은 졸업생도 가능한가요?',
    answer: '네, 졸업 후 2년 이내의 졸업생까지 상담 신청이 가능합니다. 단, 재학생 우선 배정될 수 있습니다.',
  },
  {
    id: 'f4',
    category: '기타',
    question: '커리어개발팀 위치가 어디인가요?',
    answer: '서울캠퍼스 학생회관 2층에 위치하고 있습니다. 운영시간은 평일 09:00~17:30 입니다.',
  }
];

export const HY_BLUE = '#0E4A84';
