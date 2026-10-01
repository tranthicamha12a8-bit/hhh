import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ModeSelectView } from './components/ModeSelectView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { SkillsView } from './components/SkillsView';
import { AchievementsView } from './components/AchievementsView';
import { QUESTIONS } from './data/questions';
import { CategoryId, Question, QuizConfig, QuizMode, UserStats } from './types';
import { getUserStats, recordQuizSession, resetAllStats } from './utils/storage';
import { sound } from './utils/sound';

export default function App() {
  const [view, setView] = useState<'home' | 'mode-select' | 'quiz' | 'result' | 'skills' | 'achievements'>('home');
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [selectedTopicForSkills, setSelectedTopicForSkills] = useState<CategoryId>('fire');

  // Quiz state
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({ mode: 'topic', topicId: 'fire', questionCount: 10 });
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    categoryBreakdown: Record<CategoryId, { answered: number; correct: number }>;
    mode: QuizMode;
    topicId?: CategoryId;
    newBadges: string[];
  } | null>(null);

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  // Helper to prepare questions based on configuration
  const prepareQuestions = (config: QuizConfig): Question[] => {
    let pool: Question[] = [];

    if (config.mode === 'topic' && config.topicId) {
      pool = QUESTIONS.filter((q) => q.category === config.topicId);
      // Shuffle within topic
      return [...pool].sort(() => Math.random() - 0.5);
    }

    if (config.mode === 'reflex' && config.topicId) {
      pool = QUESTIONS.filter((q) => q.category === config.topicId);
      return [...pool].sort(() => Math.random() - 0.5);
    }

    // Mixed mode or all-topic reflex
    const count = config.questionCount || 10;
    if (count >= 50) {
      // All 50 questions shuffled
      return [...QUESTIONS].sort(() => Math.random() - 0.5);
    }

    // Evenly sample from 5 categories
    const categories: CategoryId[] = ['fire', 'earthquake', 'gas', 'elevator', 'lightning'];
    const perCategory = Math.ceil(count / categories.length);
    const selected: Question[] = [];

    categories.forEach((cat) => {
      const catQuestions = QUESTIONS.filter((q) => q.category === cat).sort(() => Math.random() - 0.5);
      selected.push(...catQuestions.slice(0, perCategory));
    });

    // Shuffle and slice to exact count
    return selected.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const handleStartQuiz = (config: QuizConfig) => {
    const questions = prepareQuestions(config);
    setQuizConfig(config);
    setQuizQuestions(questions);
    setView('quiz');
  };

  const handleFinishQuiz = (result: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    categoryBreakdown: Record<CategoryId, { answered: number; correct: number }>;
    mode: QuizMode;
    topicId?: CategoryId;
  }) => {
    const { newBadges, updatedStats } = recordQuizSession(result);
    setStats(updatedStats);
    setQuizResult({
      ...result,
      newBadges,
    });
    setView('result');
  };

  const handlePracticeTopicFromSkills = (topicId: CategoryId) => {
    handleStartQuiz({
      mode: 'topic',
      topicId,
      questionCount: 10,
      maxLives: 3,
    });
  };

  const handleResetStats = () => {
    resetAllStats();
    setStats(getUserStats());
    sound.playClick();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Global Navigation Header */}
      <Header
        currentView={view}
        onNavigate={(newView) => {
          if (newView === 'home') setView('home');
          if (newView === 'skills') setView('skills');
          if (newView === 'achievements') setView('achievements');
          if (newView === 'mode-select') setView('mode-select');
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {view === 'home' && (
          <HomeView
            stats={stats}
            onStartChallenge={() => setView('mode-select')}
            onOpenSkills={(topicId) => {
              if (topicId) setSelectedTopicForSkills(topicId);
              setView('skills');
            }}
            onOpenAchievements={() => setView('achievements')}
          />
        )}

        {view === 'mode-select' && (
          <ModeSelectView
            onBack={() => setView('home')}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {view === 'quiz' && (
          <QuizView
            questions={quizQuestions}
            config={quizConfig}
            onFinishQuiz={handleFinishQuiz}
            onExit={() => setView('home')}
          />
        )}

        {view === 'result' && quizResult && (
          <ResultView
            score={quizResult.score}
            totalQuestions={quizResult.totalQuestions}
            correctAnswers={quizResult.correctAnswers}
            categoryBreakdown={quizResult.categoryBreakdown}
            mode={quizResult.mode}
            topicId={quizResult.topicId}
            newBadges={quizResult.newBadges}
            onPlayAgain={() => handleStartQuiz(quizConfig)}
            onGoHome={() => setView('home')}
            onGoSkills={() => setView('skills')}
            onGoAchievements={() => setView('achievements')}
          />
        )}

        {view === 'skills' && (
          <SkillsView
            initialTopicId={selectedTopicForSkills}
            onBack={() => setView('home')}
            onPracticeTopic={handlePracticeTopicFromSkills}
          />
        )}

        {view === 'achievements' && (
          <AchievementsView
            stats={stats}
            onPlayAgain={() => setView('mode-select')}
            onGoHome={() => setView('home')}
            onGoSkills={() => setView('skills')}
            onResetStats={handleResetStats}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>THỬ THÁCH BẢN LĨNH • 101 KỸ NĂNG SINH TỒN HỌC ĐƯỜNG</span>
          <span className="text-amber-400/80 font-medium">Bình tĩnh xử lý – Chủ động bảo vệ mình.</span>
        </div>
      </footer>
    </div>
  );
}
