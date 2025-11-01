import { useApp } from '../context/AppContext';

export function HomePage() {
  const { lessons, startLesson, userProgress } = useApp();

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Stats Summary - Mobile Optimized */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 px-4 py-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-2xl font-bold mb-4">Tu Progreso</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-2xl font-black text-white">{userProgress.currentStreak}</div>
              <div className="text-xs text-white/90 font-semibold">días de racha</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">⭐</div>
              <div className="text-2xl font-black text-white">{userProgress.totalXP}</div>
              <div className="text-xs text-white/90 font-semibold">XP total</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">❤️</div>
              <div className="text-2xl font-black text-white">{userProgress.hearts}</div>
              <div className="text-xs text-white/90 font-semibold">vidas</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">💎</div>
              <div className="text-2xl font-black text-white">{userProgress.level}</div>
              <div className="text-xs text-white/90 font-semibold">nivel</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path - Mobile First */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Aprende Portugués 🇧🇷
        </h1>

        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const isLocked = !lesson.unlocked;
            const isActive = !isLocked && !isCompleted;

            // Colors for each lesson
            const colors = [
              { bg: '#58CC02', dark: '#46A302', light: '#E8F5E9' },
              { bg: '#1CB0F6', dark: '#0E92D1', light: '#E3F2FD' },
              { bg: '#CE82FF', dark: '#A568CC', light: '#F3E5F5' },
              { bg: '#FF9600', dark: '#CC7800', light: '#FFF3E0' },
              { bg: '#FF4B4B', dark: '#CC3C3C', light: '#FFEBEE' },
            ];
            const color = colors[lesson.level % colors.length];

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && startLesson(lesson)}
                disabled={isLocked}
                className={`w-full ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer active:scale-98'}
                  transition-transform duration-150`}
              >
                <div
                  className={`rounded-3xl p-5 md:p-6 shadow-lg transition-all ${
                    isLocked
                      ? 'bg-gray-100 border-2 border-gray-300'
                      : isCompleted
                      ? 'bg-yellow-50 border-4 border-yellow-400'
                      : 'border-4'
                  }`}
                  style={{
                    borderColor: isLocked ? undefined : isCompleted ? undefined : color.bg,
                    backgroundColor: isLocked ? undefined : isCompleted ? undefined : color.light,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Lesson Icon/Circle */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl relative"
                        style={{
                          backgroundColor: isLocked ? '#E5E5E5' : isCompleted ? '#FFC800' : color.bg,
                          boxShadow: isLocked
                            ? 'none'
                            : `0 4px 0 ${isCompleted ? '#D9A900' : color.dark}`,
                        }}
                      >
                        {isLocked ? '🔒' : isCompleted ? '⭐' : '📚'}

                        {/* Badge for active lesson */}
                        {isActive && (
                          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-lg">
                            NUEVO
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {lesson.description}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-white/80 px-3 py-1 rounded-full font-semibold text-gray-700">
                          📝 {lesson.exercises.length} ejercicios
                        </span>
                        <span className="bg-white/80 px-3 py-1 rounded-full font-semibold text-yellow-700">
                          ⭐ +{lesson.xpReward} XP
                        </span>
                        {isCompleted && (
                          <span className="bg-green-100 px-3 py-1 rounded-full font-bold text-green-700">
                            ✓ Completado
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Arrow */}
                    {!isLocked && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-xl">
                          {isCompleted ? '🔄' : '▶️'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Locked Message */}
                  {isLocked && (
                    <div className="mt-3 text-center text-sm text-gray-500 font-semibold">
                      🔒 Completa la lección anterior para desbloquear
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Completion Message */}
        {userProgress.completedLessons.length === lessons.length && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="text-3xl font-black text-white mb-2">¡INCREÍBLE!</h2>
            <p className="text-white text-lg font-semibold">
              ¡Completaste todas las lecciones!
            </p>
          </div>
        )}

        {/* Low Hearts Warning */}
        {userProgress.hearts < 3 && userProgress.hearts > 0 && (
          <div className="mt-6 bg-red-50 border-4 border-red-400 rounded-3xl p-5 text-center">
            <div className="text-5xl mb-2">⚠️</div>
            <h3 className="text-xl font-bold text-red-700 mb-1">¡Pocas vidas!</h3>
            <p className="text-red-600 font-semibold">
              Te quedan solo {userProgress.hearts} corazones
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
