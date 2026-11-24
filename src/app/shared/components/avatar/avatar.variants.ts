import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '@/shared/utils';

export const avatarVariants = cva('after:border-border relative flex size-8 shrink-0 rounded-full after:border after:absolute after:inset-0 after:rounded-full after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten group/avatar select-none', {
  variants: {
    zSize: {
      sm: 'size-6',
      default: 'size-8',
      lg: 'size-10',
    },
  },
  defaultVariants: {
    zSize: 'default',
  },
});

export const fallbackVariants = cva('bg-muted text-muted-foreground absolute inset-0 flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs');

export const imageVariants = cva('absolute inset-0 aspect-square size-full rounded-full object-cover opacity-0 transition-opacity duration-200', {
  variants: {
    zSize: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    zSize: 'default',
  },
});

export const avatarBadgeVariants = mergeClasses(
  'absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none',
  'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
  'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
  'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
);

export const avatarGroupVariants = cva('flex *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2 group/avatar-group', {
  variants: {
    zOrientation: {
      horizontal: 'flex-row -space-x-2',
      vertical: 'flex-col -space-y-2',
    },
  },
  defaultVariants: {
    zOrientation: 'horizontal',
  },
});

/**
 * The "+N" chip appended to a `z-avatar-group` for members the stack does not show.
 * Carries `data-slot="avatar"` so it also picks up the group's own ring/spacing rules.
 */
export const avatarGroupCountVariants = cva('bg-muted text-muted-foreground ring-background relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm ring-2 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 select-none', {
  variants: {
    zSize: {
      sm: 'size-6 text-xs',
      default: 'size-8 text-xs',
      lg: 'size-10 text-sm',
    },
  },
  defaultVariants: {
    zSize: 'default',
  },
});

export type ZardAvatarSizeVariants = NonNullable<VariantProps<typeof avatarVariants>['zSize']>;
export type ZardAvatarGroupOrientationVariants = NonNullable<VariantProps<typeof avatarGroupVariants>['zOrientation']>;
