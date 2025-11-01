import { useState } from 'react';
import type { Exercise } from '../types';
import { Button } from './Button';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
}

export function MultipleChoiceExercise({ exercise, onSubmit }: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
      setSelectedOption('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{exercise.question}</h2>
        {exercise.prompt && (
          <p className="text-gray-600">{exercise.prompt}</p>
        )}
      </div>

      <div className="space-y-3">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`w-full px-6 py-4 text-left rounded-xl border-2 transition-all ${
              selectedOption === option
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
          >
            <span className="font-medium text-lg">{option}</span>
          </button>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!selectedOption}
        fullWidth
      >
        Verificar
      </Button>
    </div>
  );
}
