import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';

function AppContent() {
  const { appState } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {appState.currentLesson ? <LessonPage /> : <HomePage />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
