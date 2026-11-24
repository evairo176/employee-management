import { cva } from 'class-variance-authority';

export const checkboxVariants = cva('border-input size-4 shrink-0 cursor-[unset] rounded-[4px] border shadow-sm transition focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:border-primary checked:bg-primary checked:text-primary-foreground dark:checked:bg-primary hover:shadow-md focus-visible:ring-3 disabled:cursor-not-allowed aria-invalid:ring-3 peer appearance-none outline-none disabled:opacity-50');

export const checkboxLabelVariants = cva('cursor-[unset] text-sm text-current empty:hidden select-none');
