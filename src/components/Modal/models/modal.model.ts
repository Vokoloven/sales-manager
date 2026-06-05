import type Button from '@/components/Button/Button';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef, ReactNode, RefObject } from 'react';

type TModal = {
  title: string;
  buttons: readonly [ReturnType<typeof Button>, ReturnType<typeof Button>];
  ref: RefObject<TNullable<ComponentRef<'dialog'>>>;
  children: ReactNode;
};

export type { TModal };
