import { cva, type VariantProps } from 'class-variance-authority';

export const dialogVariants = cva('bg-popover text-popover-foreground ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-1/2 gap-4 rounded-xl p-4 text-sm ring-1 sm:max-w-sm outline-none');

/** Classes of the mask behind a dialog, shared by the declarative form and the service. */
// A marker, so the style decides how dark and how blurred the mask is. The CDK takes one class per entry.
export const DIALOG_BACKDROP_CLASSES = 'bg-black/10 supports-backdrop-filter:backdrop-blur-xs'.split(' ').filter(Boolean);

export const dialogHeaderVariants = cva('flex flex-col gap-2');

export const dialogTitleVariants = cva('text-base leading-none font-medium wrap-anywhere font-heading');

export const dialogDescriptionVariants = cva('text-muted-foreground text-sm wrap-anywhere *:[a]:hover:text-foreground *:[a]:underline *:[a]:underline-offset-[3px]');

export const dialogFooterVariants = cva('bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end');

export type ZardDialogVariants = VariantProps<typeof dialogVariants>;
