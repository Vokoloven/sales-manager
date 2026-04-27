import { useEffect, useMemo, useState } from 'react';
import type { TUnionMerge } from '@/core/models/useTanstackQuery.model';
import type { TPrettify } from '@/core/models/utility.model';
import type { Observable } from 'rxjs';

const useTanstackQuery = <Pure, Dirty>({
  instance: { getCurrentResult, observer$ },
  dependencies = []
}: {
  instance: {
    getCurrentResult: Pure;
    observer$: Observable<Dirty>;
  };
  dependencies?: unknown[];
}) => {
  const [state, setState] = useState<Pure | Dirty>(() => getCurrentResult);
  const memoDeps = useMemo(() => dependencies, dependencies);

  useEffect(() => {
    const subscription = observer$.subscribe(setState);

    return () => {
      subscription.unsubscribe();
    };
  }, [memoDeps]);

  return state as Dirty extends Pure ? Dirty : TPrettify<TUnionMerge<Pure, Dirty>>;
};

export { useTanstackQuery };
