import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  postfix?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export type { TInput };
