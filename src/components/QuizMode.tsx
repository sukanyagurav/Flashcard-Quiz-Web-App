import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  category: string;
}

const QuizMode = () => {
  const { getFilteredCards, flashcards, categories, selectedCategories, toggleCategory, setAllCategories } = useFlashcardStore();

  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; question: string }[]>([]);
  const [questionCount, setQuestionCount] = useState(10);

  const filtered = getFilteredCards();

  const questions: QuizQuestion[] = useMemo(() => {
    if (!quizStarted) return [];
    const cards = [...filtered].sort(() => Math.random() - 0.5).slice(0, questionCount);
    return cards.map((card) => {
      const wrongAnswers = flashcards
        .filter((c) => c.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c) => c.answer);
      const options = [...wrongAnswers, card.answer].sort(() => Math.random() - 0.5);
      return {
        id: card.id,
        question: card.question,
        correctAnswer: card.answer,
        options,
        category: card.category,
      };
    });
  }, [quizStarted, questionCount]);

  const currentQuestion = questions[currentQ];

  const startQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      setQuizStarted(true);
      setCurrentQ(0);
      setScore(0);
      setSelectedAnswer(null);
      setAnswered(false);
      setQuizComplete(false);
      setAnswers([]);
      setLoading(false);
    }, 800);
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;
    setSelectedAnswer(answer);
    setAnswered(true);
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => [...a, { correct: isCorrect, question: currentQuestion.question }]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizComplete(false);
  };

  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  // Quiz setup screen
  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-lg space-y-5"
      >
        <h2 className="font-display text-xl font-bold text-foreground">🧠 Quiz Mode</h2>
        <p className="text-sm text-muted-foreground">Test your knowledge! Select categories and number of questions.</p>

        {/* Category filter */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Categories</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={setAllCategories}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all shadow-sm ${selectedCategories.length === 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => toggleCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all shadow-sm ${selectedCategories.includes(c) ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Number of Questions</p>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all shadow-sm ${questionCount === n ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{filtered.length} cards available</p>

        <Button
          className="w-full rounded-full shadow-md"
          onClick={startQuiz}
          disabled={filtered.length < 4 || loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {loading ? 'Preparing Quiz...' : `Start Quiz (${Math.min(questionCount, filtered.length)} questions)`}
        </Button>

        {filtered.length < 4 && (
          <p className="text-xs text-destructive">Need at least 4 cards for quiz mode.</p>
        )}
      </motion.div>
    );
  }

  // Quiz complete screen
  if (quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-lg space-y-5"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Trophy className="h-16 w-16 text-primary" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-foreground">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-primary">{scorePercent}%</div>
          <p className="text-muted-foreground">
            You got <span className="font-semibold text-foreground">{score}</span> out of{' '}
            <span className="font-semibold text-foreground">{questions.length}</span> correct
          </p>

          {/* Progress ring */}
          <div className="relative h-32 w-32">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" className="stroke-muted" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="50" fill="none"
                className="stroke-primary"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={314}
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * scorePercent) / 100 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </svg>
          </div>
        </div>

        {/* Answer breakdown */}
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {answers.map((a, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              {a.correct ? (
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-stats-mastered" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              )}
              <span className="text-foreground">{a.question}</span>
            </div>
          ))}
        </div>

        <Button className="w-full rounded-full shadow-md" onClick={restartQuiz}>
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </motion.div>
    );
  }

  // Quiz question screen
  return (
    <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-lg space-y-5">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-muted-foreground">Score: {score}/{currentQ + (answered ? 1 : 0)}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Category badge */}
      <span className="inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
        {currentQuestion.category}
      </span>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="font-display text-lg font-bold text-foreground">{currentQuestion.question}</h3>

          {/* Options */}
          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((opt, i) => {
              const isCorrect = opt === currentQuestion.correctAnswer;
              const isSelected = opt === selectedAnswer;
              let optionClass = 'border-border bg-card hover:bg-secondary hover:shadow-md';
              if (answered) {
                if (isCorrect) optionClass = 'border-stats-mastered bg-stats-mastered/10';
                else if (isSelected && !isCorrect) optionClass = 'border-destructive bg-destructive/10';
                else optionClass = 'border-border bg-card opacity-50';
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                  className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium text-foreground transition-all shadow-sm ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-foreground/20 text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {answered && isCorrect && <CheckCircle className="h-5 w-5 text-stats-mastered" />}
                    {answered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Button className="w-full rounded-full shadow-md" onClick={nextQuestion}>
            {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizMode;
