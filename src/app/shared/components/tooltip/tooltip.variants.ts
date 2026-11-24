import { cva, type VariantProps } from 'class-variance-authority';

export const tooltipVariants = cva('bg-foreground text-background z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md px-3 py-1.5 text-xs data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 rtl:data-[side=inline-end]:slide-in-from-right-2 rtl:data-[side=inline-start]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=opened]:animate-in data-[state=opened]:fade-in-0 data-[state=opened]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 has-data-[slot=kbd]:pe-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm');
export type ZardTooltipVariants = VariantProps<typeof tooltipVariants>;

export const tooltipPositionVariants = cva('absolute', {
  variants: {
    position: {
      top: 'bottom-0 left-[calc(50%-5px)] translate-y-full',
      bottom: '-top-2.5 left-[calc(50%-5px)] translate-y-0 rotate-180',
      left: 'top-[calc(50%-5px)] -right-2.5 translate-y-0 rotate-270',
      right: 'top-[calc(50%-5px)] -left-2.5 translate-y-0 rotate-90',
    },
  },
});

export type ZardTooltipPositionVariants = NonNullable<VariantProps<typeof tooltipPositionVariants>['position']>;
