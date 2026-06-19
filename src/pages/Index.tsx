import { useEffect } from 'react';
import { useFlashcardStore } from '@/stores/flashcardStore';
import StudyMode from '@/components/StudyMode';
import AllCardsView from '@/components/AllCardsView';
import QuizMode from '@/components/QuizMode';
import StudyStats from '@/components/StudyStats';
import { BookOpen, Sun, Moon, Brain } from 'lucide-react';

const Index = () => {
  const { view, setView, theme, toggleTheme } = useFlashcardStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
                <BookOpen className="h-4 w-4 text-primary-foreground sm:h-5 sm:w-5" />
              </div>
              <h1 className="font-display text-lg font-bold text-foreground sm:text-xl">Flashcard</h1>
            </div>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-card text-foreground transition-colors hover:bg-secondary sm:hidden"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 overflow-hidden rounded-full border-2 border-foreground sm:flex-none">
              <button
                onClick={() => setView('study')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold transition-all sm:flex-none sm:px-5 sm:py-2 sm:text-sm ${view === 'study' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-secondary'}`}
                aria-label="Study Mode"
              >
                Study
              </button>
              <button
                onClick={() => setView('all')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold transition-all sm:flex-none sm:px-5 sm:py-2 sm:text-sm ${view === 'all' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-secondary'}`}
                aria-label="All Cards"
              >
                All Cards
              </button>
              <button
                onClick={() => setView('quiz')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold transition-all sm:flex-none sm:px-5 sm:py-2 sm:text-sm ${view === 'quiz' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-secondary'}`}
                aria-label="Quiz Mode"
              >
                Quiz
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className="hidden h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-card text-foreground transition-colors hover:bg-secondary sm:flex"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 overflow-hidden">
            {view === 'study' ? <StudyMode /> : view === 'quiz' ? <QuizMode /> : <AllCardsView />}
          </div>
          <aside className="hidden lg:block">
            <StudyStats />
          </aside>
        </div>

        {/* Mobile stats */}
        <div className="mt-8 lg:hidden">
          <StudyStats />
        </div>
      </main>
    </div>
  );
};

export default Index;
