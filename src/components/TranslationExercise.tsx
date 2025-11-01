import { useState } from 'react';
import type { Exercise } from '../types';
import { Button } from './Button';

interface TranslationExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
}

export function TranslationExercise({ exercise, onSubmit }: TranslationExerciseProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{exercise.question}</h2>
        {exercise.hint && (
          <p className="text-sm text-gray-500">💡 Pista: {exercise.hint}</p>
        )}
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
          placeholder="Escribe tu respuesta..."
          autoFocus
        />

        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          fullWidth
        >
          Verificar
        </Button>
      </div>
    </div>
  );
}
