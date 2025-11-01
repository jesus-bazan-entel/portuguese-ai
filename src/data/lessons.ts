import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Saludos Básicos',
    description: 'Aprende los saludos básicos en portugués',
    level: 1,
    xpReward: 10,
    unlocked: true,
    completed: false,
    exercises: [
      {
        id: 'ex-1-1',
        type: 'translation',
        question: '¿Cómo se dice "Hola" en portugués?',
        correctAnswer: 'Olá',
        hint: 'Es muy similar al español',
        explanation: 'En portugués, "Olá" es el saludo más común, equivalente a "Hola" en español.'
      },
      {
        id: 'ex-1-2',
        type: 'multipleChoice',
        question: '¿Cómo se dice "Buenos días" en portugués?',
        prompt: 'Selecciona la respuesta correcta',
        options: ['Boa noite', 'Bom dia', 'Boa tarde', 'Tchau'],
        correctAnswer: 'Bom dia',
        explanation: '"Bom dia" se usa en la mañana, similar al español.'
      },
      {
        id: 'ex-1-3',
        type: 'translation',
        question: 'Traduce: "¿Cómo estás?"',
        correctAnswer: 'Como está',
        hint: 'Como está? o Como vai?',
        explanation: 'En portugués puedes usar "Como está?" (formal) o "Como vai?" (informal).'
      },
      {
        id: 'ex-1-4',
        type: 'multipleChoice',
        question: '¿Qué significa "Tchau"?',
        prompt: 'Selecciona la traducción correcta',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        correctAnswer: 'Adiós',
        explanation: '"Tchau" es la forma informal de despedirse en portugués.'
      },
      {
        id: 'ex-1-5',
        type: 'fillInBlank',
        question: 'Boa _____ (Buenas tardes)',
        prompt: 'Completa la frase',
        correctAnswer: 'tarde',
        hint: 'Es similar al español',
        explanation: '"Boa tarde" se usa durante la tarde, como "Buenas tardes".'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Presentaciones',
    description: 'Aprende a presentarte en portugués',
    level: 1,
    xpReward: 10,
    unlocked: false,
    completed: false,
    exercises: [
      {
        id: 'ex-2-1',
        type: 'translation',
        question: '¿Cómo se dice "Me llamo María" en portugués?',
        correctAnswer: 'Meu nome é Maria',
        hint: 'Meu nome é...',
        explanation: 'En portugués usamos "Meu nome é" (mi nombre es) o "Eu me chamo" (yo me llamo).'
      },
      {
        id: 'ex-2-2',
        type: 'multipleChoice',
        question: '¿Qué significa "Prazer em conhecê-lo"?',
        prompt: 'Selecciona la traducción correcta',
        options: ['¿Cómo estás?', 'Mucho gusto', 'Me llamo', 'Hasta luego'],
        correctAnswer: 'Mucho gusto',
        explanation: '"Prazer em conhecê-lo" significa "Mucho gusto en conocerlo/la".'
      },
      {
        id: 'ex-2-3',
        type: 'fillInBlank',
        question: 'Eu sou _____ Espanha (Soy de España)',
        prompt: 'Completa la frase',
        correctAnswer: 'da',
        hint: 'Preposición de origen',
        explanation: 'Usamos "da" (de + a) para femenino: "Eu sou da Espanha".'
      },
      {
        id: 'ex-2-4',
        type: 'translation',
        question: 'Traduce: "¿Cuál es tu nombre?"',
        correctAnswer: 'Qual é o seu nome',
        hint: 'Qual é o seu nome?',
        explanation: '"Qual é o seu nome?" es la forma de preguntar el nombre de alguien.'
      },
      {
        id: 'ex-2-5',
        type: 'multipleChoice',
        question: '¿Cómo se dice "Yo soy estudiante"?',
        prompt: 'Selecciona la respuesta correcta',
        options: ['Eu sou professor', 'Eu sou estudante', 'Você é estudante', 'Ele é estudante'],
        correctAnswer: 'Eu sou estudante',
        explanation: '"Eu sou estudante" - "Eu" (yo), "sou" (soy), "estudante" (estudiante).'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Números 1-10',
    description: 'Aprende los números del 1 al 10 en portugués',
    level: 1,
    xpReward: 10,
    unlocked: false,
    completed: false,
    exercises: [
      {
        id: 'ex-3-1',
        type: 'multipleChoice',
        question: '¿Cómo se dice "uno" en portugués?',
        prompt: 'Selecciona la respuesta correcta',
        options: ['dois', 'um', 'três', 'zero'],
        correctAnswer: 'um',
        explanation: '"Um" es "uno" en portugués (masculino), "uma" para femenino.'
      },
      {
        id: 'ex-3-2',
        type: 'translation',
        question: 'Traduce: "cinco"',
        correctAnswer: 'cinco',
        hint: 'Es igual que en español',
        explanation: 'El número 5 se dice igual en portugués y español: "cinco".'
      },
      {
        id: 'ex-3-3',
        type: 'fillInBlank',
        question: 'um, dois, _____, quatro (uno, dos, tres, cuatro)',
        prompt: 'Completa la secuencia',
        correctAnswer: 'três',
        hint: 'Número tres',
        explanation: '"Três" es "tres" en portugués.'
      },
      {
        id: 'ex-3-4',
        type: 'multipleChoice',
        question: '¿Qué número es "oito"?',
        prompt: 'Selecciona el número correcto',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        explanation: '"Oito" es "ocho" en portugués.'
      },
      {
        id: 'ex-3-5',
        type: 'translation',
        question: '¿Cómo se dice "diez"?',
        correctAnswer: 'dez',
        hint: 'Comienza con "d"',
        explanation: '"Dez" es "diez" en portugués.'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Familia',
    description: 'Vocabulario sobre la familia',
    level: 2,
    xpReward: 15,
    unlocked: false,
    completed: false,
    exercises: [
      {
        id: 'ex-4-1',
        type: 'multipleChoice',
        question: '¿Cómo se dice "madre" en portugués?',
        prompt: 'Selecciona la respuesta correcta',
        options: ['pai', 'mãe', 'irmão', 'filho'],
        correctAnswer: 'mãe',
        explanation: '"Mãe" es "madre" en portugués.'
      },
      {
        id: 'ex-4-2',
        type: 'translation',
        question: 'Traduce: "padre"',
        correctAnswer: 'pai',
        hint: 'Tres letras',
        explanation: '"Pai" es "padre" en portugués.'
      },
      {
        id: 'ex-4-3',
        type: 'fillInBlank',
        question: 'Meu _____ se chama João (Mi hermano se llama João)',
        prompt: 'Completa la frase',
        correctAnswer: 'irmão',
        hint: 'hermano = irmão',
        explanation: '"Irmão" es "hermano" en portugués. "Irmã" es "hermana".'
      },
      {
        id: 'ex-4-4',
        type: 'multipleChoice',
        question: '¿Qué significa "avó"?',
        prompt: 'Selecciona la traducción correcta',
        options: ['abuelo', 'abuela', 'tía', 'tío'],
        correctAnswer: 'abuela',
        explanation: '"Avó" es "abuela" y "avô" es "abuelo".'
      },
      {
        id: 'ex-4-5',
        type: 'translation',
        question: '¿Cómo se dice "hijo"?',
        correctAnswer: 'filho',
        hint: 'Similar a "filho"',
        explanation: '"Filho" es "hijo" y "filha" es "hija".'
      }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Colores',
    description: 'Aprende los colores en portugués',
    level: 2,
    xpReward: 15,
    unlocked: false,
    completed: false,
    exercises: [
      {
        id: 'ex-5-1',
        type: 'multipleChoice',
        question: '¿Cómo se dice "rojo" en portugués?',
        prompt: 'Selecciona la respuesta correcta',
        options: ['verde', 'azul', 'vermelho', 'amarelo'],
        correctAnswer: 'vermelho',
        explanation: '"Vermelho" es "rojo" en portugués.'
      },
      {
        id: 'ex-5-2',
        type: 'translation',
        question: 'Traduce: "azul"',
        correctAnswer: 'azul',
        hint: 'Es igual que en español',
        explanation: '"Azul" se dice igual en portugués y español.'
      },
      {
        id: 'ex-5-3',
        type: 'fillInBlank',
        question: 'O céu é _____ (El cielo es azul)',
        prompt: 'Completa la frase',
        correctAnswer: 'azul',
        hint: 'Color del cielo',
        explanation: '"Azul" es el color del cielo.'
      },
      {
        id: 'ex-5-4',
        type: 'multipleChoice',
        question: '¿Qué significa "branco"?',
        prompt: 'Selecciona la traducción correcta',
        options: ['negro', 'blanco', 'gris', 'marrón'],
        correctAnswer: 'blanco',
        explanation: '"Branco" es "blanco" en portugués.'
      },
      {
        id: 'ex-5-5',
        type: 'translation',
        question: '¿Cómo se dice "verde"?',
        correctAnswer: 'verde',
        hint: 'Es igual que en español',
        explanation: '"Verde" se dice igual en portugués y español.'
      }
    ]
  }
];
