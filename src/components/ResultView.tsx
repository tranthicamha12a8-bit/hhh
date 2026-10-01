import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, BookOpen, Trophy, Award, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { CategoryId, QuizMode } from '../types';
import { CATEGORIES } from '../data/categories';
import { getRankByScore, BADGES } from '../data/badges';
import { sound } from '../utils/sound';

interface ResultViewProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  categoryBreakdown: Record<CategoryId, { answered: number; correct: number }>;
  mode: QuizMode;
  topicId?: CategoryId;
  newBadges: string[];
  onPlayAgain: () => void;
  onGoHome: () => void;
  onGoSkills: () => void;
  onGoAchievements: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  categoryBreakdown,
  newBadges,
  onPlayAgain,
  onGoHome,
  onGoSkills,
  onGoAchievements,
}) => {
  const maxScore = totalQuestions * 10;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const rank = getRankByScore(score, maxScore);

  // Trigger celebration on mount
  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fde047', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
      });
    } catch {
      // Canvas confetti fallback
    }
  }, []);

  // Category analysis
  const categoryEntries = (Object.keys(categoryBreakdown) as CategoryId[])
    .map((catId) => {
      const item = categoryBreakdown[catId];
      const percent = item.answered > 0 ? Math.round((item.correct / item.answered) * 100) : null;
      return {
        id: catId,
        info: CATEGORIES[catId],
        answered: item.answered,
        correct: item.correct,
        percent,
      };
    })
    .filter((e) => e.answered > 0);

  // Find strongest and needs practice
  let strongestCat = categoryEntries[0];
  let weakestCat = categoryEntries[0];

  categoryEntries.forEach((entry) => {
    if (entry.percent !== null) {
      if (!strongestCat || (strongestCat.percent !== null && entry.percent > strongestCat.percent)) {
        strongestCat = entry;
      }
      if (!weakestCat || (weakestCat.percent !== null && entry.percent < weakestCat.percent)) {
        weakestCat = entry;
      }
    }
  });

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Celebration Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-2 animate-bounce">🎉</div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          THỬ THÁCH HOÀN TẤT!
        </h2>
        <p className="text-sm font-semibold text-amber-300 mt-1">
          Bản lĩnh sinh tồn được trui rèn qua từng phản xạ!
        </p>
      </div>

      {/* Main Score & Rank Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6 text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Score & Correct Count */}
        <div className="mb-6">
          <div className="text-4xl sm:text-6xl font-black text-amber-400 tracking-tight">
            {score} <span className="text-2xl sm:text-4xl text-slate-500 font-bold">/ {maxScore}</span>
          </div>
          <div className="text-xs uppercase font-extrabold text-amber-400/80 tracking-widest mt-1">
            ĐIỂM ĐẠT ĐƯỢC
          </div>

          <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold text-slate-200">
            <span>✅ {correctAnswers}/{totalQuestions} câu đúng</span>
            <span>•</span>
            <span className={accuracy >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
              Chính xác {accuracy}%
            </span>
          </div>
        </div>

        {/* Rank Tier Banner */}
        <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700/80 max-w-lg mx-auto text-left flex items-start gap-4">
          <div className="text-4xl p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
            {rank.icon}
          </div>
          <div>
            <div className="text-xs font-black uppercase text-amber-400 tracking-wider">
              XẾP HẠNG THÀNH TÍCH
            </div>
            <div className="text-xl font-black text-white mt-0.5">
              {rank.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {rank.comment}
            </p>
          </div>
        </div>
      </div>

      {/* Newly Unlocked Badges Notification (if any) */}
      {newBadges.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400/40 rounded-3xl p-5 mb-6 text-center animate-in fade-in slide-in-from-bottom-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            HUY HIỆU MỚI MỞ KHÓA!
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {newBadges.map((badgeId) => {
              const b = BADGES.find((item) => item.id === badgeId);
              if (!b) return null;
              return (
                <div
                  key={b.id}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-400/40 flex items-center gap-2.5 shadow-lg"
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-black text-amber-300">{b.title}</div>
                    <div className="text-[11px] text-slate-400">{b.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 8: BIỂU ĐỒ NĂNG LỰC (Competency Breakdown) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">
            BIỂU ĐỒ NĂNG LỰC THEO TỪNG CHỦ ĐỀ
          </h3>
        </div>

        <div className="space-y-4 mb-6">
          {categoryEntries.map((item) => {
            const pct = item.percent ?? 0;
            return (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2 text-white">
                    <span>{item.info.icon}</span>
                    <span>{item.info.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>{item.correct}/{item.answered} đúng</span>
                    <span className="font-extrabold text-amber-300">{pct}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 80
                        ? 'bg-emerald-500'
                        : pct >= 50
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Automatic Evaluation Comments */}
        {categoryEntries.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-700/60 space-y-2 text-xs sm:text-sm">
            {strongestCat && (
              <div className="flex items-start gap-2 text-emerald-300">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Điểm mạnh nhất:</strong> {strongestCat.info.icon} {strongestCat.info.name} ({strongestCat.percent}% chính xác) – Bạn có phản xạ ứng biến rất đáng khen!
                </span>
              </div>
            )}
            {weakestCat && weakestCat.percent !== null && weakestCat.percent < 80 && (
              <div className="flex items-start gap-2 text-amber-300/90">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Chủ đề cần luyện thêm:</strong> {weakestCat.info.icon} {weakestCat.info.name} ({weakestCat.percent}% chính xác) – Hãy ôn lại các nguyên tắc an toàn trong mục Học kỹ năng.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* 1. CHƠI LẠI */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="p-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-5 h-5 text-slate-950" />
          <span>CHƠI LẠI</span>
        </button>

        {/* 2. THÀNH TÍCH */}
        <button
          onClick={() => {
            sound.playClick();
            onGoAchievements();
          }}
          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all flex flex-col items-center justify-center gap-1.5"
        >
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>THÀNH TÍCH</span>
        </button>

        {/* 3. HỌC KỸ NĂNG */}
        <button
          onClick={() => {
            sound.playClick();
            onGoSkills();
          }}
          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all flex flex-col items-center justify-center gap-1.5"
        >
          <BookOpen className="w-5 h-5 text-slate-300" />
          <span>HỌC KỸ NĂNG</span>
        </button>

        {/* 4. VỀ TRANG CHỦ */}
        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all flex flex-col items-center justify-center gap-1.5"
        >
          <Home className="w-5 h-5 text-slate-300" />
          <span>TRANG CHỦ</span>
        </button>
      </div>
    </div>
  );
};
