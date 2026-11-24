import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva('focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&>svg]:size-3 [&>svg]:size-3! [&>z-spinner>svg]:size-3! [&>svg]:pointer-events-none', {
  variants: {
    zType: {
      default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
      destructive: 'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
      outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 [a&]:hover:underline',
    },
  },
  defaultVariants: {
    zType: 'default',
  },
});

export type ZardBadgeTypeVariants = NonNullable<VariantProps<typeof badgeVariants>['zType']>;
