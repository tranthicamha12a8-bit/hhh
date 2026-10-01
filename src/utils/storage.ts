import { CategoryId, UserStats } from '../types';

const STORAGE_KEY = 'thu_thach_ban_linh_stats_v1';

const defaultStats: UserStats = {
  highScore: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  categoryStats: {
    fire: { answered: 0, correct: 0 },
    earthquake: { answered: 0, correct: 0 },
    gas: { answered: 0, correct: 0 },
    elevator: { answered: 0, correct: 0 },
    lightning: { answered: 0, correct: 0 },
  },
  completedTopics: [],
  reflexCompleted: false,
  unlockedBadgeIds: [],
};

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
      categoryStats: {
        ...defaultStats.categoryStats,
        ...(parsed.categoryStats || {}),
      },
      completedTopics: parsed.completedTopics || [],
      unlockedBadgeIds: parsed.unlockedBadgeIds || [],
    };
  } catch {
    return defaultStats;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage', e);
  }
}

export function recordQuizSession(params: {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  categoryBreakdown: Record<CategoryId, { answered: number; correct: number }>;
  mode: 'topic' | 'mixed' | 'reflex';
  topicId?: CategoryId;
}): { newBadges: string[]; updatedStats: UserStats } {
  const current = getUserStats();
  const newBadges: string[] = [];

  const updatedStats: UserStats = {
    ...current,
    highScore: Math.max(current.highScore, params.score),
    totalAnswered: current.totalAnswered + params.totalQuestions,
    totalCorrect: current.totalCorrect + params.correctAnswers,
    lastPlayedAt: new Date().toISOString(),
    categoryStats: { ...current.categoryStats },
    completedTopics: [...current.completedTopics],
    unlockedBadgeIds: [...current.unlockedBadgeIds],
  };

  // Update category stats
  (Object.keys(params.categoryBreakdown) as CategoryId[]).forEach((cat) => {
    const item = params.categoryBreakdown[cat];
    if (item && item.answered > 0) {
      updatedStats.categoryStats[cat] = {
        answered: (updatedStats.categoryStats[cat]?.answered || 0) + item.answered,
        correct: (updatedStats.categoryStats[cat]?.correct || 0) + item.correct,
      };
    }
  });

  // Track completed topics
  if (params.mode === 'topic' && params.topicId) {
    if (!updatedStats.completedTopics.includes(params.topicId)) {
      updatedStats.completedTopics.push(params.topicId);
    }
  }

  // Track reflex completion
  if (params.mode === 'reflex') {
    updatedStats.reflexCompleted = true;
  }

  // Evaluate Badges
  // 1. CHIẾN BINH LỬA: Hoàn thành chủ đề Cháy nhà
  if (updatedStats.completedTopics.includes('fire') && !updatedStats.unlockedBadgeIds.includes('badge-fire')) {
    updatedStats.unlockedBadgeIds.push('badge-fire');
    newBadges.push('badge-fire');
  }

  // 2. BẢN LĨNH ĐẤT: Hoàn thành chủ đề Động đất
  if (updatedStats.completedTopics.includes('earthquake') && !updatedStats.unlockedBadgeIds.includes('badge-earthquake')) {
    updatedStats.unlockedBadgeIds.push('badge-earthquake');
    newBadges.push('badge-earthquake');
  }

  // 3. NGƯỜI PHẢN XẠ: Đạt trên 80% số câu
  const sessionAccuracy = params.totalQuestions > 0 ? (params.correctAnswers / params.totalQuestions) * 100 : 0;
  if (sessionAccuracy >= 80 && !updatedStats.unlockedBadgeIds.includes('badge-reflex')) {
    updatedStats.unlockedBadgeIds.push('badge-reflex');
    newBadges.push('badge-reflex');
  }

  // 4. NHANH NHƯ CHỚP: Hoàn thành chế độ Phản xạ
  if (updatedStats.reflexCompleted && !updatedStats.unlockedBadgeIds.includes('badge-speed')) {
    updatedStats.unlockedBadgeIds.push('badge-speed');
    newBadges.push('badge-speed');
  }

  // 5. BẢN LĨNH SINH TỒN: Hoàn thành cả 5 chủ đề
  const all5Topics: CategoryId[] = ['fire', 'earthquake', 'gas', 'elevator', 'lightning'];
  const hasCompletedAll5 = all5Topics.every((cat) => updatedStats.completedTopics.includes(cat));
  if (hasCompletedAll5 && !updatedStats.unlockedBadgeIds.includes('badge-survivalist')) {
    updatedStats.unlockedBadgeIds.push('badge-survivalist');
    newBadges.push('badge-survivalist');
  }

  // 6. BẬC THẦY SINH TỒN: Đạt 100% trong toàn bộ 50 câu (hoặc bài thi 50 câu đúng cả 50)
  if (params.totalQuestions >= 50 && params.correctAnswers === params.totalQuestions && !updatedStats.unlockedBadgeIds.includes('badge-master')) {
    updatedStats.unlockedBadgeIds.push('badge-master');
    newBadges.push('badge-master');
  }

  saveUserStats(updatedStats);
  return { newBadges, updatedStats };
}

export function resetAllStats(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset stats', e);
  }
}
