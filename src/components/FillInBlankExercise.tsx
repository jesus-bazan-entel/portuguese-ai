import { useState } from 'react';
import type { Exercise } from '../types';
import { Button } from './Button';

interface FillInBlankExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
}

export function FillInBlankExercise({ exercise, onSubmit }: FillInBlankExerciseProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Question */}
      <div className="text-center px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          {exercise.question}
        </h2>
        {exercise.prompt && (
          <p className="text-base md:text-lg text-gray-600 mb-2">{exercise.prompt}</p>
        )}
        {exercise.hint && (
          <div className="inline-block bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-2 mt-2">
            <p className="text-sm md:text-base text-blue-700">💡 Pista: {exercise.hint}</p>
          </div>
        )}
      </div>

      {/* Input - Touch friendly */}
      <div className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full px-5 md:px-6 py-5 md:py-4 text-base md:text-lg border-4 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none text-center shadow-md min-h-[60px] md:min-h-[56px]"
          placeholder="Escribe aquí..."
          autoFocus
        />

        {/* Submit button */}
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
