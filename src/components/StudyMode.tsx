import { motion, AnimatePresence } from 'framer-motion';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { ChevronLeft, ChevronRight, Shuffle, CheckCircle, RotateCcw, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudyMode = () => {
  const {
    currentIndex, isFlipped, setCurrentIndex, setIsFlipped,
    markKnown, resetProgress, shuffleCards, getFilteredCards,
    selectedCategories, hideMastered, setHideMastered, setAllCategories, toggleCategory, categories,
    toggleFavorite, favorites, theme,
  } = useFlashcardStore();
  const { toast } = useToast();

  const filtered = getFilteredCards();
  const card = filtered[currentIndex];

  const next = () => setCurrentIndex(Math.min(currentIndex + 1, filtered.length - 1));
  const prev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

  const handleKnow = () => {
    if (!card) return;
    markKnown(card.id);
    toast({ title: '✅ Progress updated!', description: `Mastery: ${Math.min(5, card.mastery + 1)}/5` });
  };

  const handleReset = () => {
    resetProgress();
    toast({ title: '🔄 Progress reset', description: 'All mastery levels set to 0.' });
  };

  return (
    <div className="rounded-2xl border-2 border-foreground bg-card p-5 space-y-5 shadow-lg">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="appearance-none rounded-full border-2 border-foreground bg-card px-4 py-2 pr-8 text-sm font-medium text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={selectedCategories.length === 0 ? '' : selectedCategories[0]}
          onChange={(e) => {
            if (e.target.value === '') setAllCategories();
            else { setAllCategories(); toggleCategory(e.target.value); }
          }}
          aria-label="Filter by category"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={hideMastered}
            onChange={(e) => setHideMastered(e.target.checked)}
            className="h-4 w-4 rounded border-2 border-foreground accent-primary"
          />
          Hide Mastered
        </label>

        <button
          className="ml-auto flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          onClick={() => { shuffleCards(); toast({ title: '🔀 Cards shuffled!' }); }}
          aria-label="Shuffle cards"
        >
          <Shuffle className="h-4 w-4" /> Shuffle
        </button>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-foreground" />

      {/* Card */}
      {card ? (
        <div
          className="group relative cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped); }}
          tabIndex={0}
          role="button"
          aria-label={isFlipped ? 'Show question' : 'Reveal answer'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${card.id}-${isFlipped}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-foreground p-8 ${theme === 'dark' ? 'bg-secondary' : 'bg-flashcard-pink'}`}
            >
              {/* Favorite button */}
              <button
                type="button"
                aria-label={favorites[card.id] ? 'Unfavorite card' : 'Favorite card'}
                onClick={(e) => { e.stopPropagation(); toggleFavorite(card.id); }}
                className="absolute right-4 top-4 z-10"
              >
                <Star className={`h-5 w-5 ${favorites[card.id] ? 'fill-flashcard-yellow text-flashcard-yellow' : 'text-foreground/40'}`} />
              </button>

              {/* Category badge */}
              <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-foreground bg-card px-3 py-1 text-xs font-semibold text-foreground">
                {card.category}
              </span>

              {/* Decorative sparkles */}
              <span className="absolute right-12 top-5 text-xl text-flashcard-purple opacity-60">✦</span>
              <span className="absolute bottom-16 left-6 text-2xl text-flashcard-yellow opacity-80">✦</span>

              {!isFlipped ? (
                <>
                  <h3 className="text-center font-display text-2xl font-bold text-foreground mt-4">{card.question}</h3>
                  <p className="mt-3 text-sm text-foreground/60">Click to reveal answer</p>
                </>
              ) : (
                <p className="text-center text-lg leading-relaxed text-foreground mt-4">{card.answer}</p>
              )}

              {/* Mastery bar */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="h-2 w-20 overflow-hidden rounded-full bg-foreground/15">
                  <div
                    className="h-full rounded-full bg-card transition-all"
                    style={{ width: `${(card.mastery / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground/60">{card.mastery}/5</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border-2 border-foreground bg-card text-muted-foreground">
          No cards match your filters.
        </div>
      )}

      {/* Actions */}
      {card && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="flex items-center gap-1.5 rounded-full border-2 border-foreground bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-95"
            onClick={handleKnow}
          >
            <CheckCircle className="h-4 w-4" /> I Know This
          </button>
          <button
            className="flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" /> Reset Progress
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="border-t-2 border-foreground" />

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-1 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          onClick={prev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <span className="text-sm font-medium text-muted-foreground">
          Card {filtered.length > 0 ? currentIndex + 1 : 0} of {filtered.length}
        </span>
        <button
          className="flex items-center gap-1 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          onClick={next}
          disabled={currentIndex >= filtered.length - 1}
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StudyMode;
