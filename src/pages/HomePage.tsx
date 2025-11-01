import { useApp } from '../context/AppContext';

export function HomePage() {
  const { lessons, startLesson, userProgress } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Top Section with Character */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Floating mascot */}
          <div className="absolute top-4 right-4 text-6xl md:text-7xl animate-bounce">
            🦜
          </div>

          {/* Welcome message */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
              ¡Hola! 👋
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-semibold">
              Continúa tu camino de aprendizaje
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-2xl font-black text-orange-500">{userProgress.currentStreak}</div>
              <div className="text-xs font-bold text-gray-600">Racha</div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
              <div className="text-3xl mb-1">⭐</div>
              <div className="text-2xl font-black text-yellow-600">{userProgress.totalXP}</div>
              <div className="text-xs font-bold text-gray-600">XP Total</div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
              <div className="text-3xl mb-1">❤️</div>
              <div className="text-2xl font-black text-red-500">{userProgress.hearts}</div>
              <div className="text-xs font-bold text-gray-600">Vidas</div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
              <div className="text-3xl mb-1">💎</div>
              <div className="text-2xl font-black text-purple-600">{userProgress.level}</div>
              <div className="text-xs font-bold text-gray-600">Nivel</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path - Vertical with connections */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 pb-20">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 via-gray-200 to-transparent transform -translate-x-1/2 hidden md:block" />

          {/* Lessons */}
          <div className="space-y-8">
            {lessons.map((lesson, index) => {
              const isCompleted = userProgress.completedLessons.includes(lesson.id);
              const isLocked = !lesson.unlocked;
              const isActive = !isLocked && !isCompleted;

              // Alternating left/right on desktop
              const isLeft = index % 2 === 0;

              // Dynamic colors per lesson
              const colors = [
                { main: '#58CC02', shadow: '#46A302', bg: 'from-green-400 to-emerald-500' },
                { main: '#1CB0F6', shadow: '#0E92D1', bg: 'from-blue-400 to-cyan-500' },
                { main: '#CE82FF', shadow: '#A568CC', bg: 'from-purple-400 to-pink-500' },
                { main: '#FF9600', shadow: '#CC7800', bg: 'from-orange-400 to-yellow-500' },
                { main: '#FF4B4B', shadow: '#CC3C3C', bg: 'from-red-400 to-rose-500' },
              ];
              const color = colors[index % colors.length];

              return (
                <div
                  key={lesson.id}
                  className={`relative ${isLeft ? 'md:pr-8' : 'md:pl-8 md:ml-auto'} md:w-3/4`}
                >
                  {/* Lesson Card */}
                  <div
                    className={`relative ${
                      isLocked ? 'opacity-70' : 'hover:scale-105'
                    } transition-all duration-300`}
                  >
                    <button
                      onClick={() => !isLocked && startLesson(lesson)}
                      disabled={isLocked}
                      className="w-full text-left"
                    >
                      {/* Main lesson bubble */}
                      <div className="relative">
                        {/* Glow effect for active */}
                        {isActive && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${color.bg} opacity-20 blur-xl rounded-full`} />
                        )}

                        {/* Lesson icon */}
                        <div className="flex items-center gap-4 bg-white rounded-3xl p-5 shadow-xl border-b-4"
                          style={{
                            borderColor: isLocked ? '#E5E5E5' : isCompleted ? '#FFC800' : color.main
                          }}
                        >
                          {/* Icon circle */}
                          <div className="relative flex-shrink-0">
                            <div
                              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl relative overflow-hidden"
                              style={{
                                background: isLocked
                                  ? '#E5E5E5'
                                  : isCompleted
                                  ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                                  : `linear-gradient(135deg, ${color.main} 0%, ${color.shadow} 100%)`,
                                boxShadow: isLocked ? 'none' : `0 8px 16px ${color.main}40`
                              }}
                            >
                              {isLocked ? '🔒' : isCompleted ? '⭐' : '📚'}

                              {/* Sparkle for completed */}
                              {isCompleted && (
                                <>
                                  <div className="absolute top-0 right-0 text-2xl animate-ping">✨</div>
                                  <div className="absolute bottom-0 left-0 text-2xl animate-pulse">✨</div>
                                </>
                              )}
                            </div>

                            {/* Progress ring for active */}
                            {isActive && (
                              <div className="absolute inset-0 rounded-full border-4 border-dashed animate-spin-slow"
                                style={{ borderColor: color.main }}
                              />
                            )}
                          </div>

                          {/* Lesson details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-1">
                                  {lesson.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {lesson.description}
                                </p>
                              </div>
                              {!isLocked && (
                                <div className="ml-2">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold shadow-lg">
                                    {isCompleted ? '✓' : '▶'}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Stats badges */}
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                                📝 {lesson.exercises.length} ejercicios
                              </span>
                              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
                                ⭐ +{lesson.xpReward} XP
                              </span>
                              {isCompleted && (
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                  ✓ ¡Completado!
                                </span>
                              )}
                              {isActive && index === 0 && (
                                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                                  👉 ¡Empieza aquí!
                                </span>
                              )}
                            </div>

                            {/* Locked message */}
                            {isLocked && (
                              <div className="mt-3 text-sm text-gray-500 font-semibold">
                                🔒 Completa la lección anterior para desbloquear
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Characters cheering */}
                    {isActive && index === 0 && (
                      <div className="absolute -right-12 top-0 text-4xl animate-bounce hidden lg:block">
                        👋
                      </div>
                    )}
                  </div>

                  {/* Checkpoint treasure */}
                  {(index + 1) % 3 === 0 && index < lessons.length - 1 && (
                    <div className="flex justify-center my-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-45 hover:rotate-0 transition-transform duration-500">
                          <span className="text-3xl transform -rotate-45 hover:rotate-0 transition-transform duration-500">💎</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Trophy */}
          {userProgress.completedLessons.length === lessons.length ? (
            <div className="mt-12 text-center">
              <div className="inline-block relative">
                <div className="text-8xl animate-bounce mb-4">🏆</div>
                <div className="absolute inset-0 bg-yellow-400 opacity-20 blur-2xl rounded-full" />
              </div>
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-black mb-2">¡INCREÍBLE!</h2>
                <p className="text-xl font-bold">¡Completaste todas las lecciones! 🎉</p>
              </div>
            </div>
          ) : (
            <div className="mt-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-gray-600 font-bold">¡Sigue aprendiendo!</p>
            </div>
          )}
        </div>
      </div>

      {/* Low hearts warning - floating */}
      {userProgress.hearts < 3 && userProgress.hearts > 0 && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 z-50">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-4 shadow-2xl border-4 border-red-600 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="font-black text-lg">¡Pocas vidas!</h3>
                <p className="text-sm font-semibold">Solo te quedan {userProgress.hearts} ❤️</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
