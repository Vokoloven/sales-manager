import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

type TInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label?: string;
  error?: string;
  postfix?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export type { TInput };
