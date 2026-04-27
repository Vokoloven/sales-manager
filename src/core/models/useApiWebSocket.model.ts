import type { TKey, TPrettify } from './utility.model';
import type { USE_API_WEB_SOCKET_DEFAULT } from '@/core/constants/useApiWebSocket.constant';
import type { apiWebSocketService } from '@/core/services/ApiWebSocket.service';
import type { Observable } from 'rxjs';

type TWebSocketInstance<T> = typeof apiWebSocketService.instance extends (...args: any[]) => {
  socket$: Observable<unknown>;
} & infer All
  ? TPrettify<{ socket$: Observable<T> } & Omit<All, 'socket$'>>
  : never;

type TWebSocketDefault = {
  [K in TKey<typeof USE_API_WEB_SOCKET_DEFAULT>]: K extends typeof USE_API_WEB_SOCKET_DEFAULT.event
    ? never
    : { [USE_API_WEB_SOCKET_DEFAULT.event]: K };
}[TKey<typeof USE_API_WEB_SOCKET_DEFAULT>];

type TWebSocketExtendAction<Action> = Action | TWebSocketDefault;

type TUseApiWebSocket<State, Action> = {
  instance: () => TWebSocketInstance<Action>;
  reducer: (state: State, action: Action) => State;
  initialState: State;
  onError?: VoidFunction;
  dependencies?: unknown[];
};

export type { TUseApiWebSocket, TWebSocketInstance, TWebSocketExtendAction };
