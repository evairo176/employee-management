import { cva, type VariantProps } from 'class-variance-authority';

export const selectVariants = cva('relative inline-block w-full rounded-lg [&_button]:focus-visible:border-ring [&_button]:focus-visible:ring-ring/50 [&_button]:focus-visible:border [&_button]:focus-visible:ring-[3px] group');

export const selectTriggerVariants = cva(
  "border-input flex w-full items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors select-none data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=default]:min-h-8 data-[size=sm]:h-7 data-[size=sm]:min-h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {},
  },
);

export const selectContentVariants = cva('bg-popover text-popover-foreground ring-foreground/10 relative z-50 flex max-h-96 w-full min-w-36 origin-(--z-select-content-transform-origin) flex-col overflow-hidden rounded-lg shadow-md ring-1 duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[align-trigger=true]:animate-none! ', {
  variants: {
    zPosition: {
      'item-aligned': '',
      popper: 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
    },
  },
  defaultVariants: {
    zPosition: 'popper',
  },
});

export const selectViewportVariants = cva('box-border min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-1', {
  variants: {
    zPosition: {
      'item-aligned': '',
      popper: 'w-full min-w-(--z-select-trigger-width) scroll-my-1',
    },
  },
  defaultVariants: {
    zPosition: 'popper',
  },
});

export const selectScrollButtonVariants = cva('bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*="size-"])]:size-4');

export const selectGroupVariants = cva('');

export const selectLabelVariants = cva('text-muted-foreground px-1.5 py-1 text-xs');

export const selectSeparatorVariants = cva('bg-border -mx-1 my-1 block h-px pointer-events-none');

export const selectItemVariants = cva('relative flex w-full cursor-default items-center gap-1.5 rounded-md outline-hidden select-none', {
  variants: {
    zSize: {
      sm: 'py-1 text-xs',
      default: 'py-1 text-sm',
      lg: 'py-2 text-base',
    },
    zMode: {
      normal: 'ps-1.5 pe-8',
      compact: 'ps-1.5 pe-8',
    },
  },
  defaultVariants: {
    zSize: 'default',
    zMode: 'normal',
  },
});

export const selectItemStateVariants = cva(
  'focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg:not([class*="text-"])]:text-muted-foreground *:data-[slot=select-item-text]:flex *:data-[slot=select-item-text]:items-center *:data-[slot=select-item-text]:gap-2 [&_svg:not([class*="size-"])]:size-4 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
);

export const selectItemIconVariants = cva('absolute flex size-3.5 items-center justify-center', {
  variants: {
    // zSize variants are placeholders for compound variant matching
    zSize: {
      sm: '',
      default: '',
      lg: '',
    },
    zMode: {
      normal: 'end-2',
      compact: 'end-2',
    },
  },
  defaultVariants: {
    zSize: 'default',
    zMode: 'normal',
  },
});

export type ZardSelectPositionVariants = NonNullable<VariantProps<typeof selectContentVariants>['zPosition']>;
export type ZardSelectItemModeVariants = NonNullable<VariantProps<typeof selectItemVariants>['zMode']>;
export type ZardSelectAlignVariants = 'start' | 'center' | 'end';
export type ZardSelectSizeVariants = 'default' | 'sm';
