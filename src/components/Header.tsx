import { useApp } from '../context/AppContext';

export function Header() {
  const { userProgress } = useApp();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-3xl md:text-4xl">🦜</div>
            <div>
              <h1 className="text-lg md:text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                PortuApp
              </h1>
              <p className="text-xs text-gray-500 font-semibold hidden md:block">Aprende Portugués</p>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Streak */}
            <div className="relative group">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md">
                <span className="text-xl md:text-2xl">🔥</span>
                <span className="font-black text-orange-600 text-sm md:text-base">{userProgress.currentStreak}</span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Racha de días
              </div>
            </div>

            {/* XP */}
            <div className="relative group">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md">
                <span className="text-xl md:text-2xl">⭐</span>
                <span className="font-black text-yellow-700 text-sm md:text-base">{userProgress.totalXP}</span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Experiencia total
              </div>
            </div>

            {/* Hearts */}
            <div className="relative group">
              <div className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md ${
                userProgress.hearts < 3
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200'
              }`}>
                <span className="text-xl md:text-2xl">❤️</span>
                <span className={`font-black text-sm md:text-base ${
                  userProgress.hearts < 3 ? 'text-white' : 'text-red-600'
                }`}>
                  {userProgress.hearts}
                </span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Vidas restantes
              </div>
            </div>

            {/* Level - Desktop only */}
            <div className="relative group hidden sm:block">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md">
                <span className="text-2xl">💎</span>
                <span className="font-black text-purple-700">{userProgress.level}</span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Nivel actual
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
