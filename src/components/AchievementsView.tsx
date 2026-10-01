import React, { useState } from 'react';
import { Trophy, Award, RotateCcw, Home, BookOpen, Trash2, CheckCircle2, Lock, Flame, ShieldAlert, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { UserStats, CategoryId } from '../types';
import { BADGES, getRankByScore } from '../data/badges';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories';
import { sound } from '../utils/sound';

interface AchievementsViewProps {
  stats: UserStats;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onGoSkills: () => void;
  onResetStats: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  stats,
  onPlayAgain,
  onGoHome,
  onGoSkills,
  onResetStats,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  // Rank determination
  const rank = getRankByScore(stats.highScore);

  // Category evaluation
  const categoryEntries = (Object.keys(stats.categoryStats) as CategoryId[])
    .map((catId) => {
      const item = stats.categoryStats[catId];
      const pct = item.answered > 0 ? Math.round((item.correct / item.answered) * 100) : null;
      return {
        id: catId,
        info: CATEGORIES[catId],
        answered: item.answered,
        correct: item.correct,
        percent: pct,
      };
    })
    .filter((e) => e.answered > 0);

  let strongest = categoryEntries[0];
  let weakest = categoryEntries[0];

  categoryEntries.forEach((entry) => {
    if (entry.percent !== null) {
      if (!strongest || (strongest.percent !== null && entry.percent > strongest.percent)) {
        strongest = entry;
      }
      if (!weakest || (weakest.percent !== null && entry.percent < weakest.percent)) {
        weakest = entry;
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          HỒ SƠ BẢN LĨNH CỦA BẠN
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          THÀNH TÍCH CỦA BẠN
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-lg mx-auto">
          Theo dõi hành trình trau dồi kỹ năng sinh tồn, độ chính xác và những huân chương đã chinh phục.
        </p>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Điểm cao nhất */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-extrabold uppercase text-slate-400">
            ĐIỂM CAO NHẤT
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-400 my-1">
            {stats.highScore}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Điểm một phiên thi
          </div>
        </div>

        {/* Tổng câu đã làm */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-extrabold uppercase text-slate-400">
            TỔNG CÂU ĐÃ LÀM
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white my-1">
            {stats.totalAnswered}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Số lượt rèn luyện
          </div>
        </div>

        {/* Số câu đúng */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-extrabold uppercase text-slate-400">
            SỐ CÂU ĐÚNG
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 my-1">
            {stats.totalCorrect}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Phản xạ chính xác
          </div>
        </div>

        {/* Tỷ lệ chính xác */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-extrabold uppercase text-slate-400">
            TỶ LỆ CHÍNH XÁC
          </div>
          <div className={`text-3xl sm:text-4xl font-black my-1 ${accuracy >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {accuracy}%
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Trên toàn bộ câu
          </div>
        </div>
      </div>

      {/* Current Rank Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl shrink-0">
            {rank.icon}
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
              DANH HIỆU BẢN LĨNH HIỆN TẠI
            </div>
            <div className="text-2xl font-black text-white">
              {rank.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
              {rank.comment}
            </p>
          </div>
        </div>
      </div>

      {/* Competency & Strongest / Weakest Topics */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              NĂNG LỰC THEO 5 CHỦ ĐỀ SINH TỒN
            </h3>
          </div>
        </div>

        {/* 5 Topic Performance List */}
        <div className="space-y-4 mb-6">
          {CATEGORY_LIST.map((cat) => {
            const st = stats.categoryStats[cat.id];
            const pct = st && st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
            const hasData = st && st.answered > 0;

            return (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2 text-white">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasData ? (
                      <>
                        <span className="text-slate-400 text-xs">{st.correct}/{st.answered} câu đúng</span>
                        <span className="font-black text-amber-300">{pct}%</span>
                      </>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Chưa làm bài</span>
                    )}
                  </div>
                </div>

                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      !hasData
                        ? 'bg-transparent'
                        : pct >= 80
                        ? 'bg-emerald-500'
                        : pct >= 50
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${hasData ? pct : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strongest / Weakest topic highlights */}
        {categoryEntries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>CHỦ ĐỀ MẠNH NHẤT:</span>
              </div>
              <div className="text-sm font-black text-white">
                {strongest ? `${strongest.info.icon} ${strongest.info.name} (${strongest.percent}%)` : 'Chưa có'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>CHỦ ĐỀ CẦN LUYỆN THÊM:</span>
              </div>
              <div className="text-sm font-black text-white">
                {weakest && weakest.percent !== null && weakest.percent < 80
                  ? `${weakest.info.icon} ${weakest.info.name} (${weakest.percent}%)`
                  : 'Tất cả chủ đề đều đạt phong độ cao!'}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-slate-500 italic">
            Hãy hoàn thành bài thi đầu tiên để xem phân tích chi tiết thế mạnh của bạn!
          </div>
        )}
      </div>

      {/* Badges Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              BỘ SƯU TẬP HUY HIỆU SINH TỒN
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-400">
            Đã mở {stats.unlockedBadgeIds.length} / {BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {BADGES.map((badge) => {
            const isUnlocked = stats.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-850 border-amber-400/50 shadow-md shadow-amber-400/5'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-400/10 border border-amber-400/30'
                        : 'bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-500" />}
                  </div>
                  <div>
                    <div className="text-xs font-black text-white flex items-center gap-1">
                      <span>{badge.title}</span>
                      {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {badge.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {/* 🔄 CHƠI LẠI */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="py-4 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-slate-950" />
          <span>CHƠI LẠI</span>
        </button>

        {/* 📚 HỌC LẠI */}
        <button
          onClick={() => {
            sound.playClick();
            onGoSkills();
          }}
          className="py-4 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-amber-300 font-bold text-sm uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>HỌC LẠI KỸ NĂNG</span>
        </button>

        {/* 🏠 VỀ TRANG CHỦ */}
        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="py-4 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-sm uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4 text-slate-300" />
          <span>VỀ TRANG CHỦ</span>
        </button>
      </div>

      {/* Delete / Reset stats */}
      <div className="pt-6 border-t border-slate-900 text-center">
        <button
          onClick={() => {
            sound.playClick();
            setShowConfirmReset(true);
          }}
          className="text-xs text-rose-400/80 hover:text-rose-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Xóa toàn bộ thành tích
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-white">Xác nhận xóa thành tích?</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Toàn bộ điểm cao, thống kê câu hỏi và huy hiệu đã mở khóa sẽ bị xóa khỏi trình duyệt. Hành động này không thể hoàn tác.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  onResetStats();
                  setShowConfirmReset(false);
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Xóa vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
