import { cva, type VariantProps } from 'class-variance-authority';

export const dropdownContentVariants = cva('bg-popover text-popover-foreground ring-foreground/10 animate-in z-50 max-h-96 min-w-32 overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-md ring-1 duration-100 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 outline-none');

export const dropdownItemVariants = cva(
  'relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:cursor-not-allowed [&_svg:not([class*=size-])]:size-4 select-none outline-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10 dark:hover:bg-destructive/20 dark:focus:bg-destructive/20 focus:text-destructive',
      },
      inset: {
        true: 'ps-7',
        false: '',
      },
      /** Rows that carry a check: the style decides where the room for it goes (the end, or the start in a menubar). */
      checkable: {
        checkbox: 'ps-1.5 pe-8 in-data-[menu=menubar]:ps-7 in-data-[menu=menubar]:pe-1.5',
        radio: 'ps-1.5 pe-8 in-data-[menu=menubar]:ps-7 in-data-[menu=menubar]:pe-1.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inset: false,
      checkable: false,
    },
  },
);

export const dropdownSubContentVariants = cva(
  'bg-popover text-popover-foreground ring-foreground/10 animate-in fade-in-0 zoom-in-95 z-50 max-h-96 min-w-24 overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-lg ring-1 duration-100 outline-none',
);

export const dropdownSubTriggerVariants = cva(
  'relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-disabled:cursor-not-allowed [&_svg:not([class*=size-])]:size-4 select-none outline-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      inset: {
        true: 'ps-7',
        false: '',
      },
    },
    defaultVariants: {
      inset: false,
    },
  },
);

export const dropdownLabelVariants = cva('text-muted-foreground relative flex items-center px-1.5 py-1 text-xs font-medium', {
  variants: {
    inset: {
      true: 'ps-7',
      false: '',
    },
  },
  defaultVariants: {
    inset: false,
  },
});

export type ZardDropdownItemVariants = VariantProps<typeof dropdownItemVariants>;
export type ZardDropdownItemTypeVariants = NonNullable<ZardDropdownItemVariants['variant']>;
