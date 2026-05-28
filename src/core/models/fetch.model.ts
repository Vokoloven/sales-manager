import type { TPrettify } from './utility.model';

type TRequestInit = TPrettify<
  RequestInit extends { headers?: HeadersInit } & infer Rest
    ? {
        headers?: Record<string, string>;
      } & Omit<Rest, 'headers'>
    : never
>;

export type { TRequestInit };
