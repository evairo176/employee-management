import { cva, type VariantProps } from 'class-variance-authority';

export const alertDialogVariants = cva('bg-popover text-popover-foreground ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-full -translate-1/2 gap-4 rounded-xl p-4 ring-1 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content outline-none', {
  variants: {
    zSize: {
      default: '',
      sm: '',
    },
  },
  defaultVariants: {
    zSize: 'default',
  },
});

/** Classes of the mask behind an alert dialog, shared by the declarative form and the service. */
// A marker, so the style decides how dark and how blurred the mask is. The CDK takes one class per entry.
export const ALERT_DIALOG_BACKDROP_CLASSES = 'bg-black/10 supports-backdrop-filter:backdrop-blur-xs'.split(' ').filter(Boolean);

export const alertDialogHeaderVariants = cva('grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]');

export const alertDialogTitleVariants = cva('text-base font-medium wrap-anywhere sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2 font-heading');

export const alertDialogDescriptionVariants = cva('text-muted-foreground text-sm text-balance wrap-anywhere [&_a]:hover:text-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-[3px]');

export const alertDialogFooterVariants = cva('bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end');

export const alertDialogMediaVariants = cva("bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6");

export type ZardAlertDialogVariants = VariantProps<typeof alertDialogVariants>;
export type ZardAlertDialogSizeVariants = NonNullable<VariantProps<typeof alertDialogVariants>['zSize']>;
