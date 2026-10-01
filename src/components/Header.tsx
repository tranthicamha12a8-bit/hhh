import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldAlert, BookOpen, Trophy, Home } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentView: 'home' | 'mode-select' | 'quiz' | 'result' | 'skills' | 'achievements';
  onNavigate: (view: 'home' | 'mode-select' | 'skills' | 'achievements') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isSoundOn, setIsSoundOn] = useState(sound.isEnabled());

  useEffect(() => {
    setIsSoundOn(sound.isEnabled());
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setIsSoundOn(newState);
    if (newState) sound.playClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-3 text-left group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <ShieldAlert className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">
              101 KỸ NĂNG SINH TỒN
            </div>
            <div className="text-base font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
              THỬ THÁCH BẢN LĨNH
            </div>
          </div>
        </button>

        {/* Navigation & Utilities */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('home');
              }}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'home'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Trang chủ</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('skills');
              }}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'skills'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Học kỹ năng</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('achievements');
              }}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'achievements'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Thành tích</span>
            </button>
          </nav>

          <div className="w-px h-6 bg-slate-800 mx-1" />

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isSoundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
            title={isSoundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-300 hover:bg-slate-900 transition-colors"
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>
    </header>
  );
};
