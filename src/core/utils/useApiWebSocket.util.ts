import { USE_API_WEB_SOCKET_DEFAULT } from '@/core/constants/useApiWebSocket.constant';
import type { TWebSocketExtendAction } from '@/core/models/useApiWebSocket.model';

const reducerExtend =
  <State, Action>(initialState: State, reducer: (state: State, action: Action) => State) =>
  (state: State, action: TWebSocketExtendAction<Action>) => {
    if (
      action &&
      typeof action === 'object' &&
      USE_API_WEB_SOCKET_DEFAULT.event in action &&
      action.event === USE_API_WEB_SOCKET_DEFAULT.resetState
    ) {
      return initialState;
    }

    return reducer(state, action as Action);
  };

export { reducerExtend };
