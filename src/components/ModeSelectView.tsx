import React, { useState } from 'react';
import { ArrowLeft, Play, Timer, Shuffle, FolderKanban, CheckCircle2, Heart } from 'lucide-react';
import { CATEGORY_LIST } from '../data/categories';
import { CategoryId, QuizConfig, QuizMode } from '../types';
import { sound } from '../utils/sound';

interface ModeSelectViewProps {
  onBack: () => void;
  onStartQuiz: (config: QuizConfig) => void;
}

export const ModeSelectView: React.FC<ModeSelectViewProps> = ({ onBack, onStartQuiz }) => {
  const [selectedTab, setSelectedTab] = useState<QuizMode>('topic');
  
  // Mixed mode question count option
  const [mixedCount, setMixedCount] = useState<10 | 20 | 30 | 50>(10);
  
  // Reflex mode question count option
  const [reflexCount, setReflexCount] = useState<10 | 20 | 30 | 50>(10);
  const [reflexTopic, setReflexTopic] = useState<CategoryId | 'all'>('all');

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Top navigation */}
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          🎮 SẴN SÀNG THỬ THÁCH
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          CHỌN CHẾ ĐỘ CHƠI
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-lg mx-auto">
          Chọn chế độ phù hợp với mục tiêu luyện tập của bạn: từng chủ đề, tổng hợp kiến thức hoặc phản xạ tốc độ cao.
        </p>
      </div>

      {/* Mode Segmented Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl mb-8">
        <button
          onClick={() => {
            sound.playClick();
            setSelectedTab('topic');
          }}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-black transition-all ${
            selectedTab === 'topic'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>🟢 CHƠI THEO CHỦ ĐỀ</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedTab('mixed');
          }}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-black transition-all ${
            selectedTab === 'mixed'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          <span>🔵 THỬ THÁCH TỔNG HỢP</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedTab('reflex');
          }}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-black transition-all ${
            selectedTab === 'reflex'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>🔴 CHẾ ĐỘ PHẢN XẠ</span>
        </button>
      </div>

      {/* Mode Content */}
      {selectedTab === 'topic' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-400 px-1">
            <span>CHỌN 1 TRONG 5 CHỦ ĐỀ CỐT LÕI (MỖI CHỦ ĐỀ 10 CÂU)</span>
            <span className="text-amber-400">100 điểm / chủ đề</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORY_LIST.map((cat) => (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-850/80 transition-all hover:shadow-xl hover:shadow-slate-950/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-amber-300 border border-slate-700">
                      10 CÂU HỎI
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    3 mạng an toàn
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onStartQuiz({
                        mode: 'topic',
                        topicId: cat.id,
                        questionCount: 10,
                        maxLives: 3,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>VÀO THI</span>
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'mixed' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-xl">
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Shuffle className="w-6 h-6 text-amber-400" />
              THỬ THÁCH TỔNG HỢP CẢ 5 CHỦ ĐỀ
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Các câu hỏi sẽ được chọn ngẫu nhiên từ toàn bộ ngân hàng câu hỏi (Cháy nhà, Động đất, Rò rỉ gas, Kẹt thang máy và Sét đánh). Hãy chọn độ dài bài thi bạn muốn:
            </p>
          </div>

          {/* Question count selector */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-300">
              SỐ LƯỢNG CÂU HỎI THỬ THÁCH:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([10, 20, 30, 50] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    sound.playClick();
                    setMixedCount(count);
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    mixedCount === count
                      ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 scale-[1.02]'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <div className="text-2xl font-black">{count} CÂU</div>
                  <div className={`text-xs font-semibold mt-1 ${mixedCount === count ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    Tối đa {count * 10} điểm
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Bao gồm đầy đủ câu hỏi ngẫu nhiên từ cả 5 chủ đề</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-300">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              3 mạng
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onStartQuiz({
                mode: 'mixed',
                questionCount: mixedCount,
                maxLives: 3,
              });
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-amber-400/20 hover:from-amber-300 hover:to-yellow-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>BẮT ĐẦU THỬ THÁCH TỔNG HỢP ({mixedCount} CÂU)</span>
          </button>
        </div>
      )}

      {selectedTab === 'reflex' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-2">
              ⚡ TỐC ĐỘ CAO - 10 GIÂY/CÂU
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Timer className="w-6 h-6 text-rose-400" />
              CHẾ ĐỘ PHẢN XẠ KHẨN CẤP
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Mỗi câu hỏi chỉ có <strong>10 giây</strong> để đọc và quyết định đáp án! Nếu hết giờ, câu hỏi sẽ tự động tính là chưa chính xác. Rèn luyện sự bình tĩnh và phản xạ chớp nhoáng khi gặp sự cố ngoài đời thật!
            </p>
          </div>

          {/* Topic filter for reflex */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-300">
              PHẠM VI CÂU HỎI:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setReflexTopic('all');
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  reflexTopic === 'all'
                    ? 'bg-amber-400 border-amber-300 text-slate-950'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                🌐 Tất cả 5 chủ đề
              </button>
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setReflexTopic(cat.id);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    reflexTopic === cat.id
                      ? 'bg-amber-400 border-amber-300 text-slate-950'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {cat.icon} {cat.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Number of questions */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-300">
              SỐ LƯỢNG CÂU HỎI:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([10, 20, 30, 50] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    sound.playClick();
                    setReflexCount(count);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    reflexCount === count
                      ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="text-lg font-black">{count} CÂU</div>
                  <div className="text-[11px] opacity-80">{count * 10} giây tối đa</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onStartQuiz({
                mode: 'reflex',
                topicId: reflexTopic === 'all' ? undefined : reflexTopic,
                questionCount: reflexTopic !== 'all' ? 10 : reflexCount,
                timePerQuestion: 10,
                maxLives: 3,
              });
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-rose-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Timer className="w-5 h-5 text-white" />
            <span>BẮT ĐẦU CHẾ ĐỘ PHẢN XẠ (10s/CÂU)</span>
          </button>
        </div>
      )}
    </div>
  );
};
