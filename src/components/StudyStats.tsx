import { useFlashcardStore } from '@/stores/flashcardStore';
import { Layers, CheckCircle, BookOpen, Mail } from 'lucide-react';

const StudyStats = () => {
  const getStats = useFlashcardStore((s) => s.getStats);
  const stats = getStats();

  const items = [
    { label: 'Total Cards', value: stats.total, icon: Layers, stripColor: 'bg-stats-total' },
    { label: 'Mastered', value: stats.mastered, icon: CheckCircle, stripColor: 'bg-stats-mastered' },
    { label: 'In Progress', value: stats.inProgress, icon: BookOpen, stripColor: 'bg-stats-progress' },
    { label: 'Not Started', value: stats.notStarted, icon: Mail, stripColor: 'bg-stats-not-started' },
  ];

  return (
    <div className="rounded-2xl border-2 border-foreground bg-card p-5 space-y-4 shadow-lg">
      <h2 className="font-display text-lg font-bold text-foreground">Study Statistics</h2>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-stretch overflow-hidden rounded-xl border-2 border-foreground"
        >
          <div className="flex-1 p-4">
            <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
            <p className="font-display text-3xl font-bold text-foreground">{item.value}</p>
          </div>
          <div className={`flex w-16 items-center justify-center ${item.stripColor}`}>
            <item.icon className="h-5 w-5 text-foreground/70" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyStats;
