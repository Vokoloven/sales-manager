import type { BUTTON_TYPE, BUTTON_SIZE } from '@/components/Button/constants/button.constant';
import type { TValueOf } from '@/core/models/utility.model';
import type Link from 'next/link';
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from 'react';

type TNavLink = Readonly<
  PropsWithChildren &
    Omit<ComponentPropsWithoutRef<typeof Link>, 'className'> & {
      buttonType?: TValueOf<typeof BUTTON_TYPE>;
      size?: TValueOf<typeof BUTTON_SIZE>;
      isActive?: boolean;
      icon?: ReactNode;
      text?: string;
      iconRight?: ReactNode;
    }
>;

export type { TNavLink };
