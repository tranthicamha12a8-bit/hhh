import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Heart, Timer, Lightbulb, AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Question, QuizConfig, QuizMode, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { sound } from '../utils/sound';

interface QuizViewProps {
  questions: Question[];
  config: QuizConfig;
  onFinishQuiz: (results: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    categoryBreakdown: Record<CategoryId, { answered: number; correct: number }>;
    mode: QuizMode;
    topicId?: CategoryId;
  }) => void;
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  config,
  onFinishQuiz,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(config.maxLives ?? 3);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Category tracking
  const [categoryBreakdown, setCategoryBreakdown] = useState<
    Record<CategoryId, { answered: number; correct: number }>
  >({
    fire: { answered: 0, correct: 0 },
    earthquake: { answered: 0, correct: 0 },
    gas: { answered: 0, correct: 0 },
    elevator: { answered: 0, correct: 0 },
    lightning: { answered: 0, correct: 0 },
  });

  // Reflex Timer (10s)
  const isReflex = config.mode === 'reflex';
  const timeLimit = config.timePerQuestion || 10;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const timerRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIndex];
  const catInfo = currentQuestion ? CATEGORIES[currentQuestion.category] : CATEGORIES.fire;
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  // Reflex mode countdown effect
  useEffect(() => {
    if (!isReflex || isConfirmed || isGameOver) return;

    setTimeLeft(timeLimit);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        if (prev <= 4) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isConfirmed, isReflex, isGameOver]);

  const handleTimeOut = () => {
    sound.playWrong();
    setIsConfirmed(true);
    setLives((prev) => {
      const nextLives = Math.max(0, prev - 1);
      if (nextLives === 0) setIsGameOver(true);
      return nextLives;
    });

    if (currentQuestion) {
      setCategoryBreakdown((prev) => ({
        ...prev,
        [currentQuestion.category]: {
          answered: prev[currentQuestion.category].answered + 1,
          correct: prev[currentQuestion.category].correct,
        },
      }));
    }
  };

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (isConfirmed || isGameOver) return;
    sound.playClick();
    setSelectedOption(opt);
  };

  const handleConfirm = () => {
    if (!selectedOption || isConfirmed || isGameOver) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setIsConfirmed(true);

    const correct = selectedOption === currentQuestion.correctAnswer;
    const cat = currentQuestion.category;

    if (correct) {
      sound.playCorrect();
      setScore((s) => s + 10);
      setCorrectCount((c) => c + 1);
      setCategoryBreakdown((prev) => ({
        ...prev,
        [cat]: {
          answered: prev[cat].answered + 1,
          correct: prev[cat].correct + 1,
        },
      }));
    } else {
      sound.playWrong();
      setLives((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) setIsGameOver(true);
        return next;
      });
      setCategoryBreakdown((prev) => ({
        ...prev,
        [cat]: {
          answered: prev[cat].answered + 1,
          correct: prev[cat].correct,
        },
      }));
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsConfirmed(false);
      setTimeLeft(timeLimit);
    } else {
      finish();
    }
  };

  const finish = () => {
    onFinishQuiz({
      score,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      categoryBreakdown,
      mode: config.mode,
      topicId: config.topicId,
    });
  };

  if (!currentQuestion) return null;

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      {/* Top Status Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 shadow-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          {/* Topic Badge */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{catInfo.icon}</span>
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                {catInfo.name}
              </span>
              <div className="text-sm font-black text-white">
                Câu {currentIndex + 1} / {questions.length}
              </div>
            </div>
          </div>

          {/* Score & Lives & Timer */}
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
              {Array.from({ length: config.maxLives ?? 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < lives
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-600 scale-90 opacity-40'
                  }`}
                />
              ))}
            </div>

            {/* Score */}
            <div className="bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block leading-tight">
                ĐIỂM
              </span>
              <span className="text-base font-black text-amber-300 leading-tight">
                {score}
              </span>
            </div>

            {/* Reflex Countdown Timer */}
            {isReflex && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-black text-sm transition-colors ${
                  timeLeft <= 3
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                    : 'bg-slate-800/80 border-slate-700 text-amber-300'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl mb-4 relative overflow-hidden">
        {/* Category Accent Stripe */}
        <div className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-2">
          <span>TÌNH HUỐNG THỰC TẾ #{currentQuestion.id}</span>
          <span>•</span>
          <span className="text-amber-400 font-extrabold">{catInfo.shortName}</span>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-snug mb-6">
          {currentQuestion.question}
        </h3>

        {/* 4 Options A, B, C, D */}
        <div className="space-y-3 mb-6">
          {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
            const optText = currentQuestion.options[optKey];
            const isSelected = selectedOption === optKey;
            const isAnswerKey = currentQuestion.correctAnswer === optKey;

            // Option styling depending on confirmation state
            let optionStyles = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-amber-400/60 hover:bg-slate-800';

            if (isConfirmed) {
              if (isAnswerKey) {
                // Correct answer always glows green
                optionStyles = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30';
              } else if (isSelected && !isAnswerKey) {
                // Wrong selected answer glows red
                optionStyles = 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                optionStyles = 'bg-slate-900/50 border-slate-800/50 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              optionStyles = 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-md shadow-amber-400/10 ring-1 ring-amber-400/40';
            }

            return (
              <button
                key={optKey}
                disabled={isConfirmed || isGameOver}
                onClick={() => handleSelectOption(optKey)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 flex items-start gap-3.5 ${optionStyles} ${
                  !isConfirmed && !isGameOver ? 'active:scale-[0.99] cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Option Letter Bubble */}
                <div
                  className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 transition-colors ${
                    isConfirmed && isAnswerKey
                      ? 'bg-emerald-500 text-slate-950'
                      : isConfirmed && isSelected && !isAnswerKey
                      ? 'bg-rose-500 text-white'
                      : isSelected
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-700/60 text-slate-300'
                  }`}
                >
                  {isConfirmed && isAnswerKey ? (
                    <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  ) : isConfirmed && isSelected && !isAnswerKey ? (
                    <XCircle className="w-5 h-5 text-white" />
                  ) : (
                    optKey
                  )}
                </div>

                <div className="flex-1 text-sm sm:text-base font-semibold pt-0.5 leading-snug">
                  {optText}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button: XÁC NHẬN (Before confirmation) */}
        {!isConfirmed && !isGameOver && (
          <button
            onClick={handleConfirm}
            disabled={!selectedOption}
            className={`w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
              selectedOption
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xl shadow-amber-400/20 active:scale-[0.99]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            <span>XÁC NHẬN ĐÁP ÁN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Feedback Section (After confirmation) */}
        {isConfirmed && !isGameOver && (
          <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
            {isCorrect ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-base font-black text-emerald-400 flex items-center gap-2">
                    <span>🟢 CHÍNH XÁC!</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">
                      +10 ĐIỂM
                    </span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="font-extrabold text-amber-300 block mb-0.5 flex items-center gap-1">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      VÌ SAO?
                    </span>
                    {currentQuestion.explanation}
                  </div>
                  {currentQuestion.takeaway && (
                    <div className="mt-2 text-xs text-emerald-300/90 italic border-l-2 border-emerald-400 pl-2">
                      💡 Kỹ năng cần nhớ: {currentQuestion.takeaway}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <div className="text-base font-black text-rose-400 flex items-center gap-2">
                    <span>🔴 CHƯA CHÍNH XÁC!</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500 text-rose-300 font-bold">
                      +0 ĐIỂM {lives > 0 && '(Trừ 1 mạng)'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="font-extrabold text-amber-300 block mb-0.5 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      HÃY NHỚ
                    </span>
                    {currentQuestion.explanation}
                  </div>
                  {currentQuestion.takeaway && (
                    <div className="mt-2 text-xs text-amber-300 italic border-l-2 border-amber-400 pl-2">
                      💡 Hành động an toàn: {currentQuestion.takeaway}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CÂU TIẾP THEO → */}
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-amber-400/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'CÂU TIẾP THEO →' : 'XEM KẾT QUẢ CUỐI BÀI →'}</span>
            </button>
          </div>
        )}

        {/* Game Over Banner if lives exhausted */}
        {isGameOver && (
          <div className="space-y-4 pt-3 border-t border-slate-800 text-center animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50">
              <div className="text-3xl mb-1">💔</div>
              <div className="text-lg font-black text-rose-300 uppercase tracking-wide">
                BẠN ĐÃ DÙNG HẾT 3 MẠNG AN TOÀN!
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                Trong tình huống khẩn cấp, từng thao tác đều cần sự chuẩn xác cao độ. Bạn có thể xem lại kết quả đã tích lũy hoặc thử sức lại ngay!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={finish}
                className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all"
              >
                XEM KẾT QUẢ ĐẠT ĐƯỢC
              </button>
              <button
                onClick={onExit}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm uppercase tracking-wider border border-slate-700 active:scale-95 transition-all"
              >
                CHỌN CHỦ ĐỀ KHÁC
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom exit link */}
      <div className="text-center">
        <button
          onClick={() => {
            sound.playClick();
            onExit();
          }}
          className="text-xs text-slate-500 hover:text-slate-300 inline-flex items-center gap-1 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Rời khỏi bài thi về trang chủ
        </button>
      </div>
    </div>
  );
};
