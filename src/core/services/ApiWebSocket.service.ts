import { webSocket } from 'rxjs/webSocket';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import type { WebSocketSubjectConfig } from 'rxjs/webSocket';

@Singleton
class ApiWebSocketService {
  public instance = <T>(urlConfigOrSource: string | WebSocketSubjectConfig<T>) => {
    const methods$ = webSocket<T>(urlConfigOrSource);

    return {
      socket$: methods$.asObservable(),
      complete: methods$.complete.bind(methods$),
      error: methods$.error.bind(methods$),
      next: methods$.next.bind(methods$)
    } as const;
  };
}

const apiWebSocketService = new ApiWebSocketService();

export { apiWebSocketService };
