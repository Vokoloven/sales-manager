import type { Ref, TextareaHTMLAttributes } from 'react';

type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
};

export type { TTextarea };
