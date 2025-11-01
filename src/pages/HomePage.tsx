import { useApp } from '../context/AppContext';

export function HomePage() {
  const { lessons, startLesson, userProgress } = useApp();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Learning Path - Vertical Center */}
        <div className="relative">
          {/* Connecting line in background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200" />

          {/* Path items */}
          {lessons.map((lesson, index) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const isLocked = !lesson.unlocked;
            const isActive = !isLocked && !isCompleted;

            // Color for each lesson level
            const levelColors = [
              { main: '#58CC02', light: '#89E219', dark: '#46A302' }, // Green
              { main: '#1CB0F6', light: '#4FC3F7', dark: '#0E92D1' }, // Blue
              { main: '#CE82FF', light: '#E4B3FF', dark: '#A568CC' }, // Purple
              { main: '#FF9600', light: '#FFB74D', dark: '#CC7800' }, // Orange
              { main: '#FF4B4B', light: '#FF7979', dark: '#CC3C3C' }, // Red
            ];
            const color = levelColors[lesson.level % levelColors.length];

            return (
              <div key={lesson.id} className="relative mb-6">
                {/* Lesson node */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => !isLocked && startLesson(lesson)}
                    disabled={isLocked}
                    className={`relative ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer group'}`}
                  >
                    {/* Main circle */}
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center relative z-10 transition-transform ${
                        !isLocked ? 'group-hover:scale-110' : ''
                      }`}
                      style={{
                        backgroundColor: isLocked ? '#E5E5E5' : isCompleted ? '#FFC800' : color.main,
                        boxShadow: isLocked
                          ? '0 4px 8px rgba(0,0,0,0.1)'
                          : `0 6px 0 ${isCompleted ? '#D9A900' : color.dark}, 0 8px 16px rgba(0,0,0,0.15)`,
                      }}
                    >
                      <span className="text-4xl">
                        {isLocked ? '🔒' : isCompleted ? '⭐' : '📚'}
                      </span>
                    </div>

                    {/* Star indicator for completed */}
                    {isCompleted && (
                      <>
                        <div className="absolute -top-1 -right-1 text-2xl z-20">✨</div>
                        <div className="absolute -bottom-1 -left-1 text-2xl z-20">✨</div>
                      </>
                    )}

                    {/* Progress indicator for active lesson */}
                    {isActive && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-white border-2 border-green-500 rounded-full px-3 py-1 shadow-lg">
                          <span className="text-xs font-bold text-green-600">EMPEZAR</span>
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Lesson info */}
                  <div className="mt-4 text-center max-w-[200px]">
                    <h3 className="font-bold text-gray-800 text-base mb-1">{lesson.title}</h3>
                    {!isLocked && (
                      <p className="text-xs text-gray-500">{lesson.exercises.length} ejercicios</p>
                    )}
                  </div>

                  {/* Character mascot for first lesson */}
                  {index === 0 && !isCompleted && (
                    <div className="absolute -right-16 top-4 text-5xl animate-bounce hidden md:block">
                      👋
                    </div>
                  )}
                </div>

                {/* Treasure/checkpoint every few lessons */}
                {(index + 1) % 3 === 0 && index < lessons.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-45">
                      <span className="text-2xl transform -rotate-45">💎</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Trophy at end */}
          <div className="flex flex-col items-center mt-8 mb-4">
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl"
              style={{ boxShadow: '0 8px 0 #D97706, 0 12px 24px rgba(0,0,0,0.2)' }}
            >
              <span className="text-6xl">
                {userProgress.completedLessons.length === lessons.length ? '🏆' : '🎯'}
              </span>
            </div>
            {userProgress.completedLessons.length === lessons.length && (
              <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-6 py-3">
                <p className="font-bold text-yellow-800 text-center">¡Unidad Completada!</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Duo mascot */}
        <div className="fixed bottom-20 right-4 text-6xl animate-bounce hidden md:block opacity-80">
          🦜
        </div>
      </div>
    </div>
  );
}
