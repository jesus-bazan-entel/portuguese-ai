import { useApp } from '../context/AppContext';

export function Header() {
  const { userProgress } = useApp();

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-green-600">🇧🇷 PortuApp</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-bold text-orange-500">{userProgress.currentStreak}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="font-bold text-yellow-600">{userProgress.totalXP} XP</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          <span className="font-bold text-red-500">{userProgress.hearts}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Nivel</span>
          <span className="font-bold text-purple-600">{userProgress.level}</span>
        </div>
      </div>
    </header>
  );
}
