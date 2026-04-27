import { fetchEventSource } from '@microsoft/fetch-event-source';
import { catchError, EMPTY, from, Observable, switchMap, throwError } from 'rxjs';
import {
  CONTENT_TYPE,
  HTTP_HEADER,
  HTTP_RESPONSE_STATUS,
  HTTP_METHOD
} from '@/core/constants/apiService.constant';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import { refreshTokenMutation } from '@/core/mutations/RefreshToken.mutation';
import { errorGenerator } from '@/core/utils/apiStreamService.util';
import { getTokens } from '../actions/tokens.action';
import type { TStream, TGetStream, TPostStream } from '@/core/models/apiStreamService.model';

@Singleton
class ApiStreamService {
  private stream$ = <Entity>({
    url,
    handlers,
    options = {},
    suppressError = false
  }: TStream): Observable<Entity> => {
    return new Observable<Entity>((subscriber) => {
      void (async () => {
        const tokens = await getTokens();

        await fetchEventSource(url, {
          headers: {
            [HTTP_HEADER.Accept]: CONTENT_TYPE.Stream,
            [HTTP_HEADER.ContentType]: CONTENT_TYPE.JSON,
            ...(tokens?.accessToken && {
              [HTTP_HEADER.Authorization]: `Bearer ${tokens.accessToken}`
            })
          },

          onopen: async (response) => {
            if (response.ok) {
              if (handlers?.onOpen) handlers.onOpen();
            } else if (
              response.status >= HTTP_RESPONSE_STATUS.badRequest &&
              response.status < HTTP_RESPONSE_STATUS.internalServerError &&
              response.status !== HTTP_RESPONSE_STATUS.tooManyRequests
            ) {
              subscriber.error(response);
            } else {
              subscriber.error(errorGenerator());
            }
          },
          onmessage: (message) => {
            try {
              const event = message.event;
              const data = JSON.parse(message.data) as unknown;
              const entity = { event, data } as Entity;

              subscriber.next(entity);
            } catch (error) {
              if (error instanceof Error) {
                subscriber.error(
                  errorGenerator({
                    error: error.name,
                    message: error.message,
                    statusCode: HTTP_RESPONSE_STATUS.expectationFailed
                  })
                );
              } else {
                subscriber.error(errorGenerator());
              }
            }
          },
          onclose: () => {
            if (handlers?.onClose) handlers.onClose();
            subscriber.complete();
          },
          onerror: (error: Error) => {
            subscriber.error(
              errorGenerator({
                error: error.name,
                message: error.message,
                statusCode: HTTP_RESPONSE_STATUS.notFound
              })
            );
          },
          openWhenHidden: true,
          ...options
        });
      })();
    }).pipe(
      catchError((errorResponse: Response) => {
        if (errorResponse.status === HTTP_RESPONSE_STATUS.unauthorized) {
          return refreshTokenMutation.refreshToken().observer$.pipe(
            switchMap(() => {
              return this.stream$<Entity>({ url, options, suppressError });
            }),
            catchError(() => EMPTY)
          );
        }
        return from(errorResponse.json()).pipe(
          switchMap((parsedError: Error) => {
            if (suppressError) {
              return EMPTY;
            }

            return throwError(() => parsedError);
          })
        );
      })
    );
  };

  public get$ = <Entity>({ url, options, handlers, suppressError }: TGetStream) =>
    this.stream$<Entity>({
      url,
      handlers,
      suppressError,
      options: {
        ...options,
        method: HTTP_METHOD.GET
      }
    });

  public post$ = <Entity>({ url, options, handlers, suppressError }: TPostStream) =>
    this.stream$<Entity>({
      url,
      handlers,
      suppressError,
      options: { ...options, method: HTTP_METHOD.POST }
    });
}

const apiStreamService = new ApiStreamService();

export { apiStreamService };
