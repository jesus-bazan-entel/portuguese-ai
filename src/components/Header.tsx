import { useApp } from '../context/AppContext';

export function Header() {
  const { userProgress } = useApp();

  return (
    <header className="bg-white border-b-2 border-gray-200 px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-3xl">🦜</div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-700 hidden sm:block">
            PortuApp
          </h1>
        </div>

        {/* Progress Stats */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1.5 rounded-xl transition-colors cursor-pointer">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-orange-500 text-sm md:text-base">{userProgress.currentStreak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1.5 rounded-xl transition-colors cursor-pointer">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-yellow-600 text-sm md:text-base">{userProgress.totalXP}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1.5 rounded-xl transition-colors cursor-pointer">
            <span className="text-xl">❤️</span>
            <span className="font-bold text-red-500 text-sm md:text-base">{userProgress.hearts}</span>
          </div>

          {/* Level - Desktop only */}
          <div className="hidden md:flex items-center gap-1 bg-blue-100 px-3 py-1.5 rounded-xl">
            <span className="text-xl">💎</span>
            <span className="font-bold text-blue-600">{userProgress.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
