import type { TQueryPipeResult } from './tanstackQueryService.model';
import type { TKey, TOptional, TPrettify, TUnwrapObservable } from './utility.model';
import type { useTanstackQuery } from '../hooks/useTanstackQuery';

type TOptionalData<Pure> = Pure extends { data: unknown } & infer Rest
  ? {
      data: undefined;
    } & Omit<Rest, 'data'>
  : never;

type TUnionMerge<Pure, Dirty, PureData = TOptionalData<Pure>> = {
  [K in TKey<PureData> | TKey<Dirty>]: K extends TKey<PureData>
    ? K extends TKey<Dirty>
      ? PureData[K] | Dirty[K]
      : TOptional<PureData[K]>
    : K extends TKey<Dirty>
      ? TOptional<Dirty[K]>
      : never;
};

type TAnyFn = (...args: any[]) => any;

type TQueryPipeResultKeys = TPrettify<TKey<TQueryPipeResult<unknown, unknown>>>;

type TReturnFnValue<T extends TAnyFn, Key extends TQueryPipeResultKeys> = ReturnType<T>[Key];

type TPure<T extends TAnyFn> = TReturnFnValue<T, 'getCurrentResult'>;

type TDirty<T extends TAnyFn> = TUnwrapObservable<TReturnFnValue<T, 'observer$'>>;

type TReturnUseTanstackQuery<T extends TAnyFn> = ReturnType<
  typeof useTanstackQuery<TPure<T>, TDirty<T>>
>;

export type { TUnionMerge, TOptionalData, TReturnUseTanstackQuery };
