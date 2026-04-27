import type { Observable } from 'rxjs';

type TUseApiStream<State, Action> = {
  instance: () => Observable<Action>;
  reducer: (state: State, action: Action) => State;
  initialState: State;
  controller: AbortController;
  onError?: VoidFunction;
  dependencies?: unknown[];
};

export type { TUseApiStream };
