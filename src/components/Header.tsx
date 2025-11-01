import { useApp } from '../context/AppContext';

export function Header() {
  const { userProgress } = useApp();

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-3 py-2 md:px-6 md:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Compact on mobile */}
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl">🦜</div>
            <h1 className="text-base md:text-xl font-bold text-gray-700">
              PortuApp
            </h1>
          </div>

          {/* Progress Stats - Compact on mobile */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Streak */}
            <div className="flex items-center gap-0.5 md:gap-1 bg-gray-50 hover:bg-gray-100 px-1.5 md:px-2.5 py-1 md:py-1.5 rounded-lg transition-colors">
              <span className="text-base md:text-xl">🔥</span>
              <span className="font-bold text-orange-500 text-xs md:text-base">{userProgress.currentStreak}</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-0.5 md:gap-1 bg-gray-50 hover:bg-gray-100 px-1.5 md:px-2.5 py-1 md:py-1.5 rounded-lg transition-colors">
              <span className="text-base md:text-xl">⭐</span>
              <span className="font-bold text-yellow-600 text-xs md:text-base">{userProgress.totalXP}</span>
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-0.5 md:gap-1 bg-gray-50 hover:bg-gray-100 px-1.5 md:px-2.5 py-1 md:py-1.5 rounded-lg transition-colors">
              <span className="text-base md:text-xl">❤️</span>
              <span className="font-bold text-red-500 text-xs md:text-base">{userProgress.hearts}</span>
            </div>

            {/* Level - Hidden on small mobile, visible on larger screens */}
            <div className="hidden sm:flex items-center gap-1 bg-blue-100 px-2.5 py-1.5 rounded-lg">
              <span className="text-xl">💎</span>
              <span className="font-bold text-blue-600 text-sm md:text-base">{userProgress.level}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
