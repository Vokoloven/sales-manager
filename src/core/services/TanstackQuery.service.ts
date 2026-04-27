import {
  QueryClient,
  QueryObserver,
  QueriesObserver,
  InfiniteQueryObserver,
  MutationObserver
} from '@tanstack/query-core';
import { identity, Observable } from 'rxjs';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import type {
  TInferQueryObserverResult,
  TQueryPipeFn
} from '@/core/models/tanstackQueryService.model';
import type {
  QueryKey,
  InfiniteData,
  QueryObserverOptions,
  QueriesObserverOptions,
  InfiniteQueryObserverOptions,
  MutationObserverOptions,
  QueryObserverResult,
  InfiniteQueryObserverResult,
  MutationObserverResult
} from '@tanstack/query-core';
import type { AxiosError } from 'axios';
import type { OperatorFunction } from 'rxjs';

@Singleton
class TanstackQueryService {
  private readonly queryClientInstance: QueryClient;
  private readonly getCurrentResult: Map<string, unknown>;

  public constructor() {
    this.queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0
        },
        mutations: {
          retry: 0
        }
      }
    });

    this.getCurrentResult = new Map();
  }

  private pipe = <T, TQueryObserverResult = TInferQueryObserverResult<T>>(
    getCurrentResult: TQueryObserverResult,
    observer$: Observable<TQueryObserverResult>
  ): TQueryPipeFn<TQueryObserverResult, TQueryObserverResult> => {
    const pipeFn =
      (observer$: Observable<TQueryObserverResult>) =>
      <R extends TQueryObserverResult>(
        ...operators: OperatorFunction<TQueryObserverResult, R>[]
      ) => {
        const pipeFromArray = <T, R>(ops: OperatorFunction<TQueryObserverResult, R>[]) => {
          if (ops.length === 0) {
            return identity as OperatorFunction<TQueryObserverResult, R>;
          }

          if (ops.length === 1) {
            return ops.at(0) as OperatorFunction<TQueryObserverResult, R>;
          }

          return (input: Observable<T>) =>
            ops.reduce(
              (prev: Observable<T>, fn: OperatorFunction<any, any>) => fn(prev),
              input
            ) as Observable<R>;
        };

        const pipedObserver$ = observer$.pipe(pipeFromArray(operators));

        return {
          getCurrentResult,
          observer$: pipedObserver$,
          pipe: pipeFn(pipedObserver$)
        } as const;
      };

    return pipeFn(observer$);
  };

  public get queryClient() {
    return this.queryClientInstance;
  }

  public query = <
    TQueryFnData = unknown,
    TError = AxiosError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(
    options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
  ) => {
    const queryObserver = new QueryObserver(this.queryClientInstance, options);

    const queryKey = options.queryKey.join('|');

    if (!this.getCurrentResult.has(queryKey)) {
      this.getCurrentResult.set(queryKey, queryObserver.getCurrentResult());
    }

    const getCurrentResult = this.getCurrentResult.get(queryKey) as QueryObserverResult<
      TData,
      TError
    >;

    const observer$ = new Observable<QueryObserverResult<TData, TError>>((subscriber) => {
      subscriber.next(queryObserver.getCurrentResult());

      const unsubscribe = queryObserver.subscribe((listener) => {
        subscriber.next(listener);
      });

      return function () {
        unsubscribe();
      };
    });

    return {
      getCurrentResult,
      observer$,
      pipe: this.pipe(getCurrentResult, observer$)
    } as const;
  };

  public queries = <
    TQueryFnData = unknown,
    TError = AxiosError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >({
    queries,
    options
  }: {
    queries: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>[];
    options?: QueriesObserverOptions;
  }) => {
    const queriesObserver = new QueriesObserver(this.queryClientInstance, queries, options);

    const queriesKey = queries.map((query) => query.queryKey).join('|');

    if (!this.getCurrentResult.has(queriesKey)) {
      this.getCurrentResult.set(queriesKey, queriesObserver.getCurrentResult());
    }

    const getCurrentResult = this.getCurrentResult.get(queriesKey) as QueryObserverResult[];

    const observer$ = new Observable<QueryObserverResult[]>((subscriber) => {
      subscriber.next(queriesObserver.getCurrentResult());

      const unsubscribe = queriesObserver.subscribe((listener) => {
        subscriber.next(listener);
      });

      return function () {
        unsubscribe();
      };
    });

    return {
      getCurrentResult,
      observer$,
      pipe: this.pipe(getCurrentResult, observer$)
    } as const;
  };

  public infiniteQuery = <
    TQueryFnData = unknown,
    TError = AxiosError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown
  >(
    options: InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
  ) => {
    const infiniteQueryObserver = new InfiniteQueryObserver(this.queryClientInstance, options);

    const queryKey = options.queryKey.join('|');

    if (!this.getCurrentResult.has(queryKey)) {
      this.getCurrentResult.set(queryKey, infiniteQueryObserver.getCurrentResult());
    }

    const getCurrentResult = this.getCurrentResult.get(queryKey) as InfiniteQueryObserverResult<
      TData,
      TError
    >;

    const observer$ = new Observable<InfiniteQueryObserverResult<TData, TError>>((subscriber) => {
      subscriber.next(infiniteQueryObserver.getCurrentResult());

      const unsubscribe = infiniteQueryObserver.subscribe((listener) => {
        subscriber.next(listener);
      });

      return function () {
        unsubscribe();
      };
    });

    return {
      getCurrentResult,
      observer$,
      pipe: this.pipe(getCurrentResult, observer$)
    } as const;
  };

  public mutation = <TData = unknown, TError = AxiosError, TVariables = void, TContext = unknown>(
    options: MutationObserverOptions<TData, TError, TVariables, TContext>
  ) => {
    const mutationObserver = new MutationObserver(this.queryClientInstance, options);

    const getCurrentResult = mutationObserver.getCurrentResult();

    const observer$ = new Observable<MutationObserverResult<TData, TError, TVariables, TContext>>(
      (subscriber) => {
        subscriber.next(getCurrentResult);

        const unsubscribe = mutationObserver.subscribe((listener) => {
          subscriber.next(listener);
        });

        return function () {
          unsubscribe();
        };
      }
    );

    return {
      getCurrentResult,
      observer$,
      pipe: this.pipe(getCurrentResult, observer$)
    } as const;
  };
}

const tanstackQueryService = new TanstackQueryService();

export { tanstackQueryService };
