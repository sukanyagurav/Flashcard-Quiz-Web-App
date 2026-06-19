import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flashcard, defaultFlashcards, defaultCategories } from '@/data/flashcards';

interface FlashcardState {
  flashcards: Flashcard[];
  categories: string[];
  selectedCategories: string[];
  hideMastered: boolean;
  currentIndex: number;
  isFlipped: boolean;
  view: 'study' | 'all' | 'quiz';
  searchQuery: string;
  favorites: Record<string, boolean>;
  theme: 'light' | 'dark';

  // Actions
  addFlashcard: (card: Omit<Flashcard, 'id' | 'mastery'>) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  deleteFlashcard: (id: string) => void;
  markKnown: (id: string) => void;
  resetProgress: (id?: string) => void;
  shuffleCards: () => void;
  setCurrentIndex: (index: number) => void;
  setIsFlipped: (flipped: boolean) => void;
  setView: (view: 'study' | 'all' | 'quiz') => void;
  toggleCategory: (category: string) => void;
  setAllCategories: () => void;
  setHideMastered: (hide: boolean) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTheme: () => void;
  getFilteredCards: () => Flashcard[];
  getStats: () => { total: number; mastered: number; inProgress: number; notStarted: number };
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      flashcards: defaultFlashcards,
      categories: defaultCategories,
      selectedCategories: [],
      hideMastered: false,
      currentIndex: 0,
      isFlipped: false,
      view: 'study',
      searchQuery: '',
      favorites: {},
      theme: 'light',

      addFlashcard: (card) => {
        const newCard: Flashcard = {
          ...card,
          id: Date.now().toString(),
          mastery: 0,
        };
        set((state) => {
          const cats = state.categories.includes(card.category)
            ? state.categories
            : [...state.categories, card.category];
          return { flashcards: [...state.flashcards, newCard], categories: cats };
        });
      },

      updateFlashcard: (id, updates) =>
        set((state) => ({
          flashcards: state.flashcards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteFlashcard: (id) =>
        set((state) => {
          const filtered = state.flashcards.filter((c) => c.id !== id);
          return {
            flashcards: filtered,
            currentIndex: Math.min(state.currentIndex, Math.max(0, filtered.length - 1)),
          };
        }),

      markKnown: (id) =>
        set((state) => ({
          flashcards: state.flashcards.map((c) =>
            c.id === id ? { ...c, mastery: Math.min(5, c.mastery + 1) } : c
          ),
        })),

      resetProgress: (id) =>
        set((state) => ({
          flashcards: state.flashcards.map((c) =>
            id ? (c.id === id ? { ...c, mastery: 0 } : c) : { ...c, mastery: 0 }
          ),
        })),

      shuffleCards: () => {
        const filtered = get().getFilteredCards();
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const allCards = get().flashcards;
        const otherCards = allCards.filter((c) => !filtered.find((f) => f.id === c.id));
        set({ flashcards: [...shuffled, ...otherCards], currentIndex: 0, isFlipped: false });
      },

      setCurrentIndex: (index) => set({ currentIndex: index, isFlipped: false }),
      setIsFlipped: (flipped) => set({ isFlipped: flipped }),
      setView: (view) => set({ view }),
      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
          currentIndex: 0,
        })),
      setAllCategories: () => set({ selectedCategories: [], currentIndex: 0 }),
      setHideMastered: (hide) => set({ hideMastered: hide, currentIndex: 0 }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: { ...state.favorites, [id]: !state.favorites[id] },
        })),
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }),

      getFilteredCards: () => {
        const { flashcards, selectedCategories, hideMastered, searchQuery } = get();
        return flashcards.filter((c) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
          if (hideMastered && c.mastery >= 5) return false;
          if (searchQuery && !c.question.toLowerCase().includes(searchQuery.toLowerCase()) && !c.answer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
          return true;
        });
      },

      getStats: () => {
        const cards = get().flashcards;
        return {
          total: cards.length,
          mastered: cards.filter((c) => c.mastery >= 5).length,
          inProgress: cards.filter((c) => c.mastery > 0 && c.mastery < 5).length,
          notStarted: cards.filter((c) => c.mastery === 0).length,
        };
      },
    }),
    { name: 'flashcard-storage' }
  )
);
