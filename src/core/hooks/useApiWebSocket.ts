import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { USE_API_WEB_SOCKET_DEFAULT } from '@/core/constants/useApiWebSocket.constant';
import { reducerExtend } from '@/core/utils/useApiWebSocket.util';
import type { TUseApiWebSocket } from '@/core/models/useApiWebSocket.model';

const useApiWebSocket = <State, Action>({
  instance,
  initialState,
  reducer,
  onError,
  dependencies = []
}: TUseApiWebSocket<State, Action>) => {
  const instanceRef = useRef(instance());
  const [reconnectKey, setReconnectKey] = useState(0);
  const [state, dispatch] = useReducer(reducerExtend(initialState, reducer), initialState);
  const memoDeps = useMemo(() => dependencies, dependencies);

  const onSubmit = useCallback(<T>(value: T) => {
    instanceRef.current.next(value);
  }, []);

  const onResetState = useCallback(() => {
    dispatch({ [USE_API_WEB_SOCKET_DEFAULT.event]: USE_API_WEB_SOCKET_DEFAULT.resetState });
  }, []);

  const onComplete = useCallback(() => {
    instanceRef.current.complete();
  }, []);

  const onReconnect = useCallback(() => {
    setReconnectKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const subscription = instanceRef.current.socket$.subscribe({
      next: (value) => {
        dispatch(value);
      },
      error: () => {
        onResetState();
        onError?.();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [memoDeps, reconnectKey]);

  return { state, onSubmit, onResetState, onComplete, onReconnect } as const;
};

export { useApiWebSocket };
