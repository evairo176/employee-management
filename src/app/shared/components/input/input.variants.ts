import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'border-input h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
);

export const inputGroupInputVariants = cva('flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent');
