import type { TOptional } from './utility.model';

type TParams<TParamKey extends string, TSearchParamKey extends string> = {
  params: Promise<Record<TParamKey, string>>;
  searchParams: Promise<Record<TSearchParamKey, TOptional<string | string[]>>>;
};

export type { TParams };
