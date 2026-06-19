import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Search, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import FlashcardForm from './FlashcardForm';
import type { Flashcard } from '@/data/flashcards';

const CARDS_PER_PAGE = 12;

const categoryEmojis: Record<string, string> = {
  'Web Development': '🌐',
  'JavaScript': '⚡',
  'React': '⚛️',
  'CSS': '🎨',
  'Data Structures': '🧱',
  'Python': '🐍',
  'General Knowledge': '💡',
};

const AllCardsView = () => {
  const { deleteFlashcard, searchQuery, setSearchQuery, getFilteredCards, categories, selectedCategories, toggleCategory, setAllCategories, favorites, toggleFavorite } = useFlashcardStore();
  const { toast } = useToast();
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [editCard, setEditCard] = useState<Flashcard | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const check = () => {
      const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
      setCanScrollLeft(scrollElement.scrollLeft > 4);
      setCanScrollRight(maxScroll > 4 && scrollElement.scrollLeft < maxScroll - 4);
    };

    check();
    const timer = setTimeout(check, 150);

    scrollElement.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    const ro = new ResizeObserver(check);
    ro.observe(scrollElement);

    return () => {
      clearTimeout(timer);
      scrollElement.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      ro.disconnect();
    };
  }, [categories.length, selectedCategories.length, showFavoritesOnly]);

  const scroll = (dir: 'left' | 'right') => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    const scrollAmount = Math.max(180, scrollElement.clientWidth * 0.7);
    scrollElement.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const filtered = getFilteredCards().filter((c) => !showFavoritesOnly || favorites[c.id]);
  const visible = filtered.slice(0, visibleCount);

  const handleDelete = (id: string) => {
    deleteFlashcard(id);
    toast({ title: '🗑️ Card deleted' });
  };

  const categoryColors = ['bg-flashcard-pink/20 text-foreground', 'bg-flashcard-mint/20 text-foreground', 'bg-flashcard-purple/20 text-foreground', 'bg-flashcard-yellow/20 text-foreground', 'bg-flashcard-coral/20 text-foreground'];

  return (
    <div>
      {/* Search + Add */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full pl-9"
            aria-label="Search flashcards"
          />
        </div>
        <Button className="rounded-full" onClick={() => { setEditCard(undefined); setShowForm(true); }}>
          <Plus className="mr-1 h-4 w-4" /> Add Card
        </Button>
      </div>

      {/* Netflix-style Category Carousel */}
      <div className="relative w-full">
        {/* Scrollable track with padding for arrows */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex items-center gap-3 overflow-x-auto py-2 px-8"
        >
          <button
            onClick={() => { setShowFavoritesOnly(false); setAllCategories(); }}
            className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 ${!showFavoritesOnly && selectedCategories.length === 0 ? 'border-primary/30 bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'border-border bg-card text-foreground hover:shadow-md'}`}
          >
            📚 All
          </button>
          <button
            onClick={() => { setShowFavoritesOnly(true); setAllCategories(); }}
            className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 ${showFavoritesOnly ? 'border-primary/30 bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'border-border bg-card text-foreground hover:shadow-md'}`}
          >
            ⭐ Favorites
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setShowFavoritesOnly(false); toggleCategory(c); }}
              className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 ${!showFavoritesOnly && selectedCategories.includes(c) ? 'border-primary/30 bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'border-border bg-card text-foreground hover:shadow-md'}`}
            >
              {categoryEmojis[c] || '📖'} {c}
            </button>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-border bg-card p-2 text-foreground shadow-md transition-all hover:shadow-lg active:scale-95 ${canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-border bg-card p-2 text-foreground shadow-md transition-all hover:shadow-lg active:scale-95 ${canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          aria-label="Scroll categories right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-md transition-all hover:shadow-lg"
          >
            {/* Favorite icon top-right */}
            <button
              onClick={() => toggleFavorite(card.id)}
              className={`absolute right-3 top-3 rounded-md p-1 transition-colors ${favorites[card.id] ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              aria-label={favorites[card.id] ? 'Unfavorite card' : 'Favorite card'}
            >
              <Star className={`h-4 w-4 ${favorites[card.id] ? 'fill-primary' : ''}`} />
            </button>

            <span className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[i % categoryColors.length]}`}>
              {categoryEmojis[card.category] || '📖'} {card.category}
            </span>
            <h4 className="pr-6 font-display text-sm font-semibold text-foreground">{card.question}</h4>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{card.answer}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(card.mastery / 5) * 100}%` }} />
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditCard(card); setShowForm(true); }} className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Edit card">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(card.id)} className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Delete card">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="flex justify-center">
          <Button variant="outline" className="rounded-full" onClick={() => setVisibleCount((v) => v + CARDS_PER_PAGE)}>
            Load More ({filtered.length - visibleCount} remaining)
          </Button>
        </div>
      )}

      {(showForm || editCard) && (
        <FlashcardForm editCard={editCard} onClose={() => { setShowForm(false); setEditCard(undefined); }} />
      )}
    </div>
  );
};

export default AllCardsView;
