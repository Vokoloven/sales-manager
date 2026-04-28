import { AxiosError } from 'axios';
import { map } from 'rxjs';
import { AXIOS_VALIDATION_ERROR } from '@/core/constants/apiService.constant';
import { errorService } from '@/core/services/Error.service';
import type { TWebSocketInstance } from '@/core/models/useApiWebSocket.model';
import type { TZodInfer } from '@/core/models/utility.model';
import type { ZodDiscriminatedUnion } from 'zod';
import type { SomeType } from 'zod/v4/core';

function ApiWebSocketValidate<Options extends readonly SomeType[]>(
  discriminatedUnion: ZodDiscriminatedUnion<Options>
) {
  return function <
    This,
    Args extends any[],
    Return extends TWebSocketInstance<TZodInfer<typeof discriminatedUnion>>,
    Value extends (this: This, ...args: Args) => Return
  >(value: Value, _context: ClassMethodDecoratorContext<This, Value>) {
    return function (this: This, ...args: Args) {
      const { socket$, ...rest } = value.apply(this, args);

      return {
        socket$: socket$.pipe(
          map((value) => {
            const parsed = discriminatedUnion.safeParse(value);
            if (parsed.success) {
              return parsed.data;
            }

            console.error(errorService.handleZodError(parsed.error));

            throw new AxiosError(
              errorService.handleZodError(parsed.error),
              AXIOS_VALIDATION_ERROR,
              undefined,
              undefined,
              undefined
            );
          })
        ),
        ...rest
      };
    };
  };
}

export { ApiWebSocketValidate };
