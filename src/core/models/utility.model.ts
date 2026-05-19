import type { z, ZodType } from 'zod';

type TNullable<T> = T | null;

type TOptional<T> = T | undefined;

type TKey<T> = keyof T;

type TValueOf<T> = T[TKey<T>];

type TZodInfer<T extends ZodType> = z.infer<T>;

type TPrettify<T> = {
  [K in TKey<T>]: T[K];
} & {};

type TDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? TDeepPartial<T[K]> : T[K];
};

export type { TNullable, TKey, TValueOf, TZodInfer, TOptional, TPrettify, TDeepPartial };
