import { cva, type VariantProps } from 'class-variance-authority';

export const inputGroupVariants = cva(
  // Input/textarea overrides when used as input-group-control
  'border-input relative flex h-8 w-full min-w-0 items-center rounded-lg border transition-colors has-[[data-slot=input-group-control]:disabled]:bg-input/50 dark:has-[[data-slot=input-group-control]:disabled]:bg-input/80 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[[data-slot=input-group-control]:disabled]:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto *:data-[slot=input-group-control]:flex-1 *:data-[slot=input-group-control]:rounded-none *:data-[slot=input-group-control]:border-0! *:data-[slot=input-group-control]:bg-transparent! *:data-[slot=input-group-control]:shadow-none *:data-[slot=input-group-control]:ring-0! [&>[data-slot=input-group-control]:focus-visible]:ring-0! [&>[data-slot=input-group-control][aria-invalid=true]]:ring-0! has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 [&>textarea[data-slot=input-group-control]]:resize-none [&>textarea[data-slot=input-group-control]]:py-2 group/input-group outline-none',
);

export const inputGroupAddonVariants = cva("text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 select-none", {
  variants: {
    zAlign: {
      'inline-start': 'order-first ps-2 has-[>button]:ms-[-0.3rem] has-[>kbd]:ms-[-0.15rem]',
      'inline-end': 'order-last pe-2 has-[>button]:me-[-0.3rem] has-[>kbd]:me-[-0.15rem]',
      'block-start': 'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
      'block-end': 'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
    },
  },
  defaultVariants: {
    zAlign: 'inline-start',
  },
});

export const inputGroupButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap shadow-none transition-all focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:cursor-not-allowed aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      zVariant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
        outline: 'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost: 'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      zSize: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        'icon-xs': 'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      zVariant: 'ghost',
      zSize: 'xs',
    },
  },
);

export const inputGroupTextVariants = cva("text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none");

export type ZardInputGroupAddonAlignVariants = NonNullable<VariantProps<typeof inputGroupAddonVariants>['zAlign']>;
export type ZardInputGroupButtonSizeVariants = NonNullable<VariantProps<typeof inputGroupButtonVariants>['zSize']>;
export type ZardInputGroupButtonVariantVariants = NonNullable<
  VariantProps<typeof inputGroupButtonVariants>['zVariant']
>;
