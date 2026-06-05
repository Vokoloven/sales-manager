import type { InputHTMLAttributes } from 'react';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
    indeterminate?: boolean;
  },
  'className'
>;
