import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Loader = ({ text = 'Loading...' }: { text?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center gap-3 py-16"
  >
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm font-medium text-muted-foreground">{text}</p>
  </motion.div>
);

export default Loader;
