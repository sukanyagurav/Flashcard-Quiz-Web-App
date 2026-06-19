import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';
import type { Flashcard } from '@/data/flashcards';

interface FlashcardFormProps {
  editCard?: Flashcard;
  onClose: () => void;
}

const FlashcardForm = ({ editCard, onClose }: FlashcardFormProps) => {
  const { addFlashcard, updateFlashcard, categories } = useFlashcardStore();
  const { toast } = useToast();
  const [question, setQuestion] = useState(editCard?.question || '');
  const [answer, setAnswer] = useState(editCard?.answer || '');
  const [category, setCategory] = useState(editCard?.category || categories[0] || '');
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !(category.trim() || newCategory.trim())) {
      toast({ title: '⚠️ All fields are required', variant: 'destructive' });
      return;
    }
    const cat = newCategory.trim() || category;
    if (editCard) {
      updateFlashcard(editCard.id, { question, answer, category: cat });
      toast({ title: '✏️ Card updated!' });
    } else {
      addFlashcard({ question, answer, category: cat });
      toast({ title: '🎉 Card created!' });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.form
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          className="mx-4 w-full max-w-md space-y-4 rounded-2xl border border-border bg-card p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{editCard ? 'Edit Card' : 'New Card'}</h3>
            <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <Input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required aria-label="Question" />
          <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Answer"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Category"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <Input placeholder="Or create new category..." value={newCategory} onChange={(e) => setNewCategory(e.target.value)} aria-label="New category" />
          <Button type="submit" className="w-full rounded-full shadow-md">
            <Plus className="mr-1 h-4 w-4" /> {editCard ? 'Update' : 'Create'} Card
          </Button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlashcardForm;
