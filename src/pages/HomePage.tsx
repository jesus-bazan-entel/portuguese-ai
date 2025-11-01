import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export function HomePage() {
  const { lessons, startLesson, userProgress } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Aprende Portugués 🇧🇷
          </h1>
          <p className="text-xl text-gray-600">
            Para hispanohablantes
          </p>
        </div>

        <div className="mb-12">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Tu Progreso</h3>
                <div className="space-y-1 text-gray-700">
                  <p>📊 Nivel: <span className="font-bold text-purple-600">{userProgress.level}</span></p>
                  <p>⭐ XP Total: <span className="font-bold text-yellow-600">{userProgress.totalXP}</span></p>
                  <p>✅ Lecciones completadas: <span className="font-bold text-green-600">{userProgress.completedLessons.length}</span></p>
                  <p>🔥 Racha: <span className="font-bold text-orange-600">{userProgress.currentStreak} días</span></p>
                </div>
              </div>
              <div className="text-6xl">
                {userProgress.completedLessons.length === 0 ? '🚀' :
                 userProgress.completedLessons.length < 3 ? '📚' :
                 userProgress.completedLessons.length < 5 ? '🌟' : '🏆'}
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Lecciones</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const isCompleted = userProgress.completedLessons.includes(lesson.id);
              const isLocked = !lesson.unlocked;

              return (
                <Card
                  key={lesson.id}
                  className={`${
                    isLocked
                      ? 'opacity-50 bg-gray-100'
                      : isCompleted
                      ? 'bg-green-50 border-2 border-green-300'
                      : 'bg-white hover:shadow-xl cursor-pointer'
                  }`}
                  onClick={() => !isLocked && startLesson(lesson)}
                  hoverable={!isLocked}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-3xl">
                        {isLocked ? '🔒' : isCompleted ? '✅' : '📖'}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <span>📊</span>
                            <span className="text-gray-600">Nivel {lesson.level}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>⭐</span>
                            <span className="text-yellow-600 font-semibold">+{lesson.xpReward} XP</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>📝</span>
                            <span className="text-gray-600">{lesson.exercises.length} ejercicios</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {!isLocked && (
                      <Button
                        variant={isCompleted ? 'success' : 'primary'}
                        className="px-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          startLesson(lesson);
                        }}
                      >
                        {isCompleted ? 'Repetir' : 'Empezar'}
                      </Button>
                    )}

                    {isLocked && (
                      <div className="text-gray-500 text-sm">
                        Completa la lección anterior
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {userProgress.hearts < 5 && (
          <Card className="bg-red-50 border-2 border-red-200 mt-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-700 mb-2">⚠️ Vidas bajas</h3>
              <p className="text-gray-700">
                Te quedan <span className="font-bold text-red-600">{userProgress.hearts}</span> corazones.
                {userProgress.hearts === 0 && ' ¡Espera un momento para recuperarlos!'}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
