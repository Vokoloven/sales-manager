import type { Ref, TextareaHTMLAttributes } from 'react';

type TTextarea = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'styles'> & {
  label?: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
};

export type { TTextarea };
