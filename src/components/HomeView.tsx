import React from 'react';
import { Play, BookOpen, Trophy, ArrowRight, Sparkles, Award } from 'lucide-react';
import { CATEGORY_LIST } from '../data/categories';
import { CategoryId, UserStats } from '../types';
import { sound } from '../utils/sound';

interface HomeViewProps {
  stats: UserStats;
  onStartChallenge: () => void;
  onOpenSkills: (topicId?: CategoryId) => void;
  onOpenAchievements: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stats,
  onStartChallenge,
  onOpenSkills,
  onOpenAchievements,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 px-4 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto mt-2 sm:mt-6">
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase mb-5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          101 KỸ NĂNG SINH TỒN DÀNH CHO HỌC SINH
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-tight">
          THỬ THÁCH <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">BẢN LĨNH</span>
        </h1>

        {/* Slogan */}
        <p className="text-lg sm:text-2xl font-bold text-amber-200/90 mb-3 tracking-wide">
          “Bình tĩnh xử lý – Chủ động bảo vệ mình.”
        </p>

        {/* Prompt question */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 leading-relaxed">
          Bạn sẽ xử lý thế nào khi tình huống bất ngờ xảy ra? Khám phá 5 tình huống khẩn cấp, rèn luyện phản xạ sinh tồn và giành trọn các danh hiệu cao quý!
        </p>

        {/* 3 Main Action Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* 1. BẮT ĐẦU THỬ THÁCH */}
          <button
            onClick={() => {
              sound.playClick();
              onStartChallenge();
            }}
            className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-400 text-slate-950 font-black shadow-xl shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-1 transition-all duration-200 active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-950/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 fill-slate-950 text-slate-950 ml-1" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-wide uppercase">
              BẮT ĐẦU THỬ THÁCH
            </span>
            <span className="text-xs font-semibold text-slate-900/80 mt-0.5">
              Chọn chủ đề & tốc độ
            </span>
          </button>

          {/* 2. HỌC KỸ NĂNG */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSkills();
            }}
            className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/40 text-white font-bold shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-wide uppercase text-amber-300">
              HỌC KỸ NĂNG
            </span>
            <span className="text-xs font-medium text-slate-400 mt-0.5">
              Thư viện 5 cẩm nang an toàn
            </span>
          </button>

          {/* 3. THÀNH TÍCH */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAchievements();
            }}
            className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/40 text-white font-bold shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-wide uppercase text-amber-300">
              THÀNH TÍCH
            </span>
            <span className="text-xs font-medium text-slate-400 mt-0.5">
              Điểm số, huy hiệu & năng lực
            </span>
          </button>
        </div>

        {/* Quick User Stats Banner (if user has played) */}
        {stats.totalAnswered > 0 && (
          <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4 mb-10 text-left">
            <div>
              <div className="text-xs text-slate-400">Điểm cao nhất</div>
              <div className="text-xl font-black text-amber-400">{stats.highScore} điểm</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="text-xs text-slate-400">Đã trả lời</div>
              <div className="text-xl font-black text-white">{stats.totalAnswered} câu ({stats.totalCorrect} đúng)</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="text-xs text-slate-400">Huy hiệu đã mở</div>
              <div className="text-xl font-black text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                {stats.unlockedBadgeIds.length} / 6
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5 Emergency Topic Cards Section */}
      <div className="mt-4 pt-6 border-t border-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-400">
            5 NHÓM TÌNH HUỐNG KHẨN CẤP
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onOpenSkills();
            }}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
          >
            Xem cẩm nang
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CATEGORY_LIST.map((cat) => {
            const catStat = stats.categoryStats[cat.id];
            const accuracy = catStat && catStat.answered > 0
              ? Math.round((catStat.correct / catStat.answered) * 100)
              : null;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  onOpenSkills(cat.id);
                }}
                className="group flex flex-col p-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-left transition-all hover:-translate-y-0.5"
              >
                <div className="text-2xl mb-1.5">{cat.icon}</div>
                <div className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  10 câu hỏi
                </div>
                {accuracy !== null && (
                  <div className="mt-2 text-[10px] font-bold text-emerald-400">
                    Đúng: {accuracy}%
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
