import type { TOptional } from './utility.model';

type TParams<
  TParamKey extends string = string,
  TSearchParamKey extends string = string
> = Readonly<{
  params: Promise<Record<TParamKey, string>>;
  searchParams: Promise<Record<TSearchParamKey, TOptional<string | string[]>>>;
}>;

export type { TParams };
