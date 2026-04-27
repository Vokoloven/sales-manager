import { useEffect, useMemo, useReducer, useRef } from 'react';
import type { TUseApiStream } from '@/core/models/useApiStream.model';

const useApiStream = <State, Action>({
  initialState,
  controller,
  reducer,
  instance,
  onError,
  dependencies = []
}: TUseApiStream<State, Action>) => {
  const instanceRef = useRef(instance());
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoDeps = useMemo(() => dependencies, dependencies);

  useEffect(() => {
    const subscription = instanceRef.current.subscribe({
      next: (payload) => {
        dispatch(payload);
      },
      error: () => {
        onError?.();
      }
    });

    return () => {
      controller.abort();
      subscription.unsubscribe();
    };
  }, [memoDeps]);

  return { state };
};

export { useApiStream };
