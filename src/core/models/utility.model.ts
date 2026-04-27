import type { Dispatch, SetStateAction } from 'react';
import type { Observable } from 'rxjs';
import type { z, ZodType } from 'zod';

type TNullable<T> = T | null;

type TOptional<T> = T | undefined;

type TKey<T> = keyof T;

type TValueOf<T> = T[TKey<T>];

type TZodInfer<T extends ZodType> = z.infer<T>;

type TSetState<T> = Dispatch<SetStateAction<T>>;

type TPrettify<T> = {
  [K in TKey<T>]: T[K];
} & {};

type TUnwrapObservable<T extends Observable<unknown>> = T extends Observable<infer P> ? P : never;

type TUnwrapObservableFn<T extends (params: any) => Observable<unknown>> = T extends (
  params: any
) => Observable<infer P>
  ? P
  : never;

export type {
  TNullable,
  TKey,
  TValueOf,
  TZodInfer,
  TOptional,
  TSetState,
  TPrettify,
  TUnwrapObservable,
  TUnwrapObservableFn
};
