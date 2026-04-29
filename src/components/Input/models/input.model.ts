import type { InputHTMLAttributes, ReactNode } from 'react';

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  postfix?: ReactNode;
};

export type { TInput };
