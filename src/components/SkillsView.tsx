import React, { useState } from 'react';
import { ArrowLeft, Play, Sparkles, AlertOctagon, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { SKILL_LIBRARY } from '../data/skills';
import { CategoryId } from '../types';
import { sound } from '../utils/sound';

interface SkillsViewProps {
  initialTopicId?: CategoryId;
  onBack: () => void;
  onPracticeTopic: (topicId: CategoryId) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  initialTopicId = 'fire',
  onBack,
  onPracticeTopic,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryId>(initialTopicId);
  const activeSkill = SKILL_LIBRARY.find((s) => s.id === activeTab) || SKILL_LIBRARY[0];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Back button */}
      <button
        onClick={() => {
          sound.playClick();
          onBack();
        }}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-amber-300 mb-6 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Về trang chủ
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          CẨM NANG SINH TỒN HỌC ĐƯỜNG
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          HỌC KỸ NĂNG XỬ LÝ KHẨN CẤP
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl mx-auto">
          Trang bị những nguyên tắc sống còn giúp bạn bình tĩnh tự vệ và hỗ trợ người khác khi đối mặt với 5 hiểm họa bất ngờ.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl mb-8">
        {SKILL_LIBRARY.map((skill) => (
          <button
            key={skill.id}
            onClick={() => {
              sound.playClick();
              setActiveTab(skill.id);
            }}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === skill.id
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="text-lg">{skill.icon}</span>
            <span className="truncate">{skill.title}</span>
          </button>
        ))}
      </div>

      {/* Main Handbook Content */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8 animate-in fade-in duration-200">
        {/* Banner Topic Overview */}
        <div className={`p-6 rounded-2xl bg-gradient-to-r ${activeSkill.bannerGradient} border border-slate-800 flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeSkill.icon}</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {activeSkill.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  {activeSkill.subtitle}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onPracticeTopic(activeSkill.id);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>THỬ THÁCH 10 CÂU</span>
            <Play className="w-3.5 h-3.5 fill-slate-950" />
          </button>
        </div>

        {/* 2 Column Layout: CẦN NHỚ & KHÔNG NÊN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3 ĐIỀU CẦN NHỚ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5" />
              <span>3 ĐIỀU CẦN NHỚ HÀNG ĐẦU</span>
            </div>

            <div className="space-y-3">
              {activeSkill.mustRemember.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-black text-emerald-300">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NHỮNG ĐIỀU KHÔNG NÊN LÀM */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
              <AlertOctagon className="w-5 h-5" />
              <span>TUYỆT ĐỐI KHÔNG NÊN LÀM</span>
            </div>

            <div className="space-y-3">
              {activeSkill.mustAvoid.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 hover:border-rose-500/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-black text-rose-300">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MẸO SINH TỒN THỰC CHIẾN (Pro Tips) */}
        {activeSkill.proTips.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-850/80 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>MẸO SINH TỒN BỔ SUNG</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeSkill.proTips.map((tip, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xs font-bold text-amber-300 mb-1">
                    💡 {tip.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tip.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Đã nắm vững lý thuyết? Hãy thử sức phản xạ ngay bây giờ!
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onPracticeTopic(activeSkill.id);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>VÀO THI CHỦ ĐỀ NÀY</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
