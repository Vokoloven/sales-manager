import type {
  QueryObserverResult,
  InfiniteQueryObserverResult,
  MutationObserverResult
} from '@tanstack/query-core';
import type { Observable, OperatorFunction } from 'rxjs';

type TInferQueryObserverResult<T> =
  T extends QueryObserverResult<infer P, infer A>
    ? QueryObserverResult<P, A>
    : T extends QueryObserverResult<infer P, infer A>[]
      ? QueryObserverResult<P, A>[]
      : T extends InfiniteQueryObserverResult<infer P, infer A>
        ? InfiniteQueryObserverResult<P, A>
        : T extends MutationObserverResult<infer P, infer A, infer B, infer C>
          ? MutationObserverResult<P, A, B, C>
          : never;

type TQueryPipeResult<TQueryObserverResult, T> = {
  getCurrentResult: TQueryObserverResult;
  observer$: Observable<T>;
  pipe: TQueryPipeFn<TQueryObserverResult, T>;
};

type TQueryPipeFn<TQueryObserverResult, T> = {
  (): TQueryPipeResult<TQueryObserverResult, T>;
  <A>(op1: OperatorFunction<T, A>): TQueryPipeResult<TQueryObserverResult, A>;
  <A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): TQueryPipeResult<TQueryObserverResult, B>;
  <A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): TQueryPipeResult<TQueryObserverResult, C>;
  <A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): TQueryPipeResult<TQueryObserverResult, D>;
  <A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): TQueryPipeResult<TQueryObserverResult, E>;
  <A, B, C, D, E, F>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>
  ): TQueryPipeResult<TQueryObserverResult, F>;
  <A, B, C, D, E, F, G>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>
  ): TQueryPipeResult<TQueryObserverResult, G>;
  <A, B, C, D, E, F, G, H>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>
  ): TQueryPipeResult<TQueryObserverResult, H>;
  <A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>,
    ...ops: OperatorFunction<any, any>[]
  ): TQueryPipeResult<TQueryObserverResult, I>;
};

export type { TInferQueryObserverResult, TQueryPipeResult, TQueryPipeFn };
