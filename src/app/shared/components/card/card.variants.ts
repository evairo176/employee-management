import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva('bg-card text-card-foreground ring-foreground/10 flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm ring-1 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card', {
  variants: {
    zSize: {
      default: '',
      sm: '',
    },
  },
});

export type ZardCardSizeType = NonNullable<VariantProps<typeof cardVariants>['zSize']>;

export const cardHeaderVariants = cva('grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [&.border-b]:pb-(--card-spacing) group/card-header @container/card-header');

export const cardTitleVariants = cva('text-base/snug font-medium group-data-[size=sm]/card:text-sm font-heading block');

export const cardDescriptionVariants = cva('text-muted-foreground text-sm block');

export const cardActionVariants = cva('col-start-2 row-span-2 row-start-1 self-start justify-self-end');

export const cardContentVariants = cva('px-(--card-spacing)');

export const cardFooterVariants = cva('bg-muted/50 flex items-center rounded-b-xl border-t p-(--card-spacing)');
