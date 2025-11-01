# PortuApp - Duolingo Clone for Portuguese Learning 🇧🇷

A language learning application inspired by Duolingo, designed to teach Portuguese to Spanish speakers.

## Features

### 🎓 Learning System
- **Multiple Exercise Types**
  - Translation exercises
  - Multiple choice questions
  - Fill-in-the-blank exercises
  - Each exercise includes hints and explanations

### 📊 Progress Tracking
- **XP System**: Earn experience points for completing lessons
- **Level Progression**: Advance through levels as you earn XP
- **Hearts/Lives System**: Track your mistakes with a heart system
- **Lesson Completion**: Visual indicators for completed lessons
- **Streak Tracking**: Maintain your learning streak

### 🎯 Course Structure
- **5 Initial Lessons**
  1. Basic Greetings (Saludos Básicos)
  2. Introductions (Presentaciones)
  3. Numbers 1-10 (Números 1-10)
  4. Family (Familia)
  5. Colors (Colores)

- **Progressive Unlocking**: Complete lessons to unlock new ones
- **Repeatable Lessons**: Practice completed lessons anytime

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Interactive exercise feedback
- Progress visualization
- Emoji-enriched interface for better engagement

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (with PostCSS)
- **State Management**: React Context API
- **Type Safety**: Full TypeScript implementation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ProgressBar.tsx
│   ├── Header.tsx
│   ├── TranslationExercise.tsx
│   ├── MultipleChoiceExercise.tsx
│   ├── FillInBlankExercise.tsx
│   └── ExerciseFeedback.tsx
├── context/            # React Context for state management
│   └── AppContext.tsx
├── data/              # Lesson content and exercises
│   └── lessons.ts
├── pages/             # Main application pages
│   ├── HomePage.tsx
│   └── LessonPage.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portuguese-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Start Learning**: Click on any unlocked lesson from the home page
2. **Complete Exercises**: Answer each question by:
   - Typing translations
   - Selecting multiple choice answers
   - Filling in blanks
3. **Get Feedback**: Receive immediate feedback with explanations
4. **Track Progress**: Monitor your XP, level, hearts, and completed lessons
5. **Unlock New Lessons**: Complete lessons to unlock subsequent ones
6. **Review**: Replay completed lessons to reinforce learning

## Exercise Types

### Translation
Translate words or phrases from Spanish to Portuguese.

### Multiple Choice
Select the correct Portuguese translation from multiple options.

### Fill in the Blank
Complete Portuguese sentences by filling in missing words.

## Progress System

- **XP (Experience Points)**: Each lesson rewards 10-15 XP
- **Levels**: Every 50 XP advances you one level
- **Hearts**: Start with 5 hearts; lose one for each mistake
- **Completion Tracking**: See all completed lessons at a glance

## Future Enhancements

Potential features for future development:
- Audio pronunciation for listening exercises
- Speaking exercises with voice recognition
- More lesson categories (food, travel, business, etc.)
- Achievement badges and rewards
- Social features (leaderboards, friend challenges)
- Spaced repetition review system
- Mobile app version
- Offline mode support
- More languages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by Duolingo's gamified language learning approach
- Built for Spanish speakers learning Portuguese
- Designed to make language learning fun and engaging

---

Made with ❤️ for language learners
