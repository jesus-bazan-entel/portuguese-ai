import { useApp } from '../context/AppContext';

export function Header() {
  const { userProgress } = useApp();

  return (
    <header className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 shadow-xl px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-3xl md:text-4xl">🦜</div>
          <h1 className="text-xl md:text-2xl font-black text-white drop-shadow-lg hidden sm:block">
            PortuApp
          </h1>
        </div>

        {/* Progress Stats */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1.5 rounded-full border-2 border-white/40">
            <span className="text-xl md:text-2xl">🔥</span>
            <span className="font-black text-white text-sm md:text-base">{userProgress.currentStreak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1.5 rounded-full border-2 border-white/40">
            <span className="text-xl md:text-2xl">⭐</span>
            <span className="font-black text-white text-sm md:text-base">{userProgress.totalXP}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1.5 rounded-full border-2 border-white/40">
            <span className="text-xl md:text-2xl">❤️</span>
            <span className="font-black text-white text-sm md:text-base">{userProgress.hearts}</span>
          </div>

          {/* Level */}
          <div className="hidden md:flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border-2 border-white/40">
            <span className="text-2xl">💎</span>
            <span className="font-black text-white">{userProgress.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
