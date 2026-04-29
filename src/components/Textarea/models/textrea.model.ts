import type { TextareaHTMLAttributes } from 'react';

type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export type { TTextarea };
