import type { BUTTON_TYPE, BUTTON_SIZE } from '../constants/button.constant';
import type { TValueOf } from '@/core/models/utility.model';
import type { PropsWithChildren, ButtonHTMLAttributes, ReactNode } from 'react';

type TButton = Readonly<
  PropsWithChildren &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
      buttonType?: TValueOf<typeof BUTTON_TYPE>;
      size?: TValueOf<typeof BUTTON_SIZE>;
      icon?: ReactNode;
      iconRight?: ReactNode;
    }
>;

export type { TButton };
