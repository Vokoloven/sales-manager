import type { BUTTON_TYPE, BUTTON_SIZE } from '../constants/button.constant';
import type { TValueOf } from '@/core/models/utility.model';
import type { PropsWithChildren, ButtonHTMLAttributes, ReactNode } from 'react';

type TButton = Readonly<
  PropsWithChildren &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
      buttonType?: TValueOf<typeof BUTTON_TYPE>;
      size?: TValueOf<typeof BUTTON_SIZE>;
      isActive?: boolean;
      icon?: ReactNode;
      text?: string;
      iconRight?: ReactNode;
    }
>;

export type { TButton };
