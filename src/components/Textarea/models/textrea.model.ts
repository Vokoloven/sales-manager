import type { Ref, TextareaHTMLAttributes } from 'react';

type TTextarea = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  label?: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
};

export type { TTextarea };
