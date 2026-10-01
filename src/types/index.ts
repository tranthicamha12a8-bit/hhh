export type CategoryId = 'fire' | 'earthquake' | 'gas' | 'elevator' | 'lightning';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  accentBg: string;
  borderColor: string;
  description: string;
  questionCount: number;
}

export interface Question {
  id: number;
  category: CategoryId;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  takeaway: string;
}

export type QuizMode = 'topic' | 'mixed' | 'reflex';

export interface QuizConfig {
  mode: QuizMode;
  topicId?: CategoryId;
  questionCount?: number;
  timePerQuestion?: number; // for reflex mode, e.g. 10s
  maxLives?: number; // default 3
}

export interface UserStats {
  highScore: number;
  totalAnswered: number;
  totalCorrect: number;
  categoryStats: Record<CategoryId, { answered: number; correct: number }>;
  completedTopics: CategoryId[];
  reflexCompleted: boolean;
  unlockedBadgeIds: string[];
  lastPlayedAt?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: CategoryId;
}

export interface RankInfo {
  title: string;
  icon: string;
  minPoints: number;
  maxPoints: number;
  comment: string;
}
