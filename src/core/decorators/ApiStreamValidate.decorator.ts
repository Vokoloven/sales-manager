import { AxiosError } from 'axios';
import { map, type Observable } from 'rxjs';
import { AXIOS_VALIDATION_ERROR } from '@/core/constants/apiService.constant';
import { errorService } from '@/core/services/Error.service';
import type { TZodInfer } from '@/core/models/utility.model';
import type { ZodDiscriminatedUnion } from 'zod';
import type { SomeType } from 'zod/v4/core';

function ApiStreamValidate<Options extends readonly SomeType[]>(
  discriminatedUnion: ZodDiscriminatedUnion<Options>
) {
  return function <
    This,
    Args extends any[],
    Return extends Observable<TZodInfer<typeof discriminatedUnion>>,
    Value extends (this: This, ...args: Args) => Return
  >(value: Value, _context: ClassMethodDecoratorContext<This, Value>) {
    return function (this: This, ...args: Args) {
      return value.apply(this, args).pipe(
        map((value) => {
          const parsed = discriminatedUnion.safeParse(value);
          if (parsed.success) {
            return parsed.data;
          }

          throw new AxiosError(
            errorService.handleZodError(parsed.error),
            AXIOS_VALIDATION_ERROR,
            undefined,
            undefined,
            undefined
          );
        })
      );
    };
  };
}

export { ApiStreamValidate };
