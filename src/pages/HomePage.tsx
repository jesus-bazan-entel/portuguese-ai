import { useApp } from '../context/AppContext';

export function HomePage() {
  const { lessons, startLesson, userProgress } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400">
      {/* Floating mascot */}
      <div className="fixed top-24 right-8 text-8xl animate-bounce z-10 hidden md:block">
        🦜
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-pulse">🇧🇷</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
            Aprende Portugués
          </h1>
          <p className="text-xl text-white/90 font-semibold">
            ¡Tu aventura comienza aquí!
          </p>
        </div>

        {/* Progress Stats Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-8 border-4 border-yellow-400">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-xs text-gray-600 font-semibold">Racha</div>
              <div className="text-lg font-black text-orange-500">{userProgress.currentStreak}</div>
            </div>
            <div>
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-xs text-gray-600 font-semibold">XP Total</div>
              <div className="text-lg font-black text-yellow-600">{userProgress.totalXP}</div>
            </div>
            <div>
              <div className="text-2xl mb-1">💎</div>
              <div className="text-xs text-gray-600 font-semibold">Nivel</div>
              <div className="text-lg font-black text-purple-600">{userProgress.level}</div>
            </div>
            <div>
              <div className="text-2xl mb-1">❤️</div>
              <div className="text-xs text-gray-600 font-semibold">Vidas</div>
              <div className="text-lg font-black text-red-500">{userProgress.hearts}</div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="relative py-8">
          {lessons.map((lesson, index) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const isLocked = !lesson.unlocked;
            const isActive = !isLocked && !isCompleted;

            // Zigzag positioning
            const isLeft = index % 2 === 0;
            const positionClass = isLeft ? 'ml-0' : 'ml-auto';

            // Color schemes for each lesson
            const colors = [
              { bg: 'bg-green-500', border: 'border-green-600', shadow: 'shadow-green-300' },
              { bg: 'bg-blue-500', border: 'border-blue-600', shadow: 'shadow-blue-300' },
              { bg: 'bg-purple-500', border: 'border-purple-600', shadow: 'shadow-purple-300' },
              { bg: 'bg-pink-500', border: 'border-pink-600', shadow: 'shadow-pink-300' },
              { bg: 'bg-orange-500', border: 'border-orange-600', shadow: 'shadow-orange-300' },
            ];
            const colorScheme = colors[index % colors.length];

            return (
              <div key={lesson.id} className="relative mb-12">
                {/* Connecting Path Line */}
                {index < lessons.length - 1 && (
                  <div
                    className={`absolute top-24 ${isLeft ? 'left-16' : 'right-16'} w-1 h-16 ${
                      isCompleted ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}
                    style={{
                      transform: isLeft ? 'translateX(50%)' : 'translateX(-50%)',
                    }}
                  />
                )}

                {/* Lesson Node */}
                <div className={`w-3/4 ${positionClass}`}>
                  <button
                    onClick={() => !isLocked && startLesson(lesson)}
                    disabled={isLocked}
                    className={`w-full group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {/* Main Lesson Circle */}
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-32 h-32 rounded-full border-8 flex items-center justify-center text-5xl
                          transition-all duration-300 ${
                          isLocked
                            ? 'bg-gray-300 border-gray-400 shadow-lg'
                            : isCompleted
                            ? 'bg-yellow-400 border-yellow-500 shadow-2xl shadow-yellow-300 group-hover:scale-110'
                            : `${colorScheme.bg} ${colorScheme.border} shadow-2xl ${colorScheme.shadow} group-hover:scale-110 animate-pulse`
                        }`}
                      >
                        {isLocked ? '🔒' : isCompleted ? '⭐' : '📖'}
                      </div>

                      {/* Stars for completed lessons */}
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 text-3xl animate-spin-slow">
                          ✨
                        </div>
                      )}

                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute -bottom-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full border-2 border-white shadow-lg animate-bounce">
                          ¡EMPEZAR!
                        </div>
                      )}
                    </div>

                    {/* Lesson Info Card */}
                    <div
                      className={`mt-4 p-4 rounded-2xl border-4 transition-all duration-300 ${
                        isLocked
                          ? 'bg-gray-100 border-gray-300'
                          : isCompleted
                          ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-400 group-hover:shadow-xl'
                          : 'bg-white border-white group-hover:shadow-xl'
                      }`}
                    >
                      <h3 className="text-xl font-black text-gray-800 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex gap-2">
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-bold">
                            Nivel {lesson.level}
                          </span>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">
                            +{lesson.xpReward} XP
                          </span>
                        </div>
                        <span className="text-gray-500 font-semibold">
                          {lesson.exercises.length} ejercicios
                        </span>
                      </div>

                      {isLocked && (
                        <div className="mt-3 text-center text-sm text-gray-500 font-semibold">
                          🔒 Completa la lección anterior
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Character decoration */}
                  {index === 0 && !isCompleted && !isLocked && (
                    <div className="absolute -right-12 top-0 text-4xl animate-bounce">
                      👋
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Finish Trophy */}
          <div className="text-center mt-12">
            <div className="text-8xl mb-4 animate-pulse">
              {userProgress.completedLessons.length === lessons.length ? '🏆' : '🎯'}
            </div>
            {userProgress.completedLessons.length === lessons.length ? (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-yellow-500">
                <h2 className="text-3xl font-black mb-2">¡FELICITACIONES! 🎉</h2>
                <p className="text-lg font-semibold">¡Completaste todas las lecciones!</p>
              </div>
            ) : (
              <div className="text-white text-xl font-bold drop-shadow-lg">
                ¡Continúa tu camino! 🚀
              </div>
            )}
          </div>
        </div>

        {/* Low Hearts Warning */}
        {userProgress.hearts < 3 && userProgress.hearts > 0 && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-red-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-red-600 animate-pulse z-20">
            <div className="flex items-center gap-3">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="font-black text-lg">¡Pocas vidas!</h3>
                <p className="text-sm">Te quedan {userProgress.hearts} corazones</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
