import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

type TInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'styles'> & {
  label?: string;
  error?: string;
  postfix?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export type { TInput };
