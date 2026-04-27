import { AxiosError } from 'axios';
import { AXIOS_VALIDATION_ERROR } from '@/core/constants/apiService.constant';
import { errorService } from '@/core/services/Error.service';
import type { AxiosResponse } from 'axios';
import type { ZodType } from 'zod';

function ApiValidate<T>(schema: ZodType<T>) {
  return function <
    This,
    Args extends any[],
    Return extends Promise<AxiosResponse>,
    Value extends (this: This, ...args: Args) => Return
  >(value: Value, _context: ClassMethodDecoratorContext<This, Value>) {
    return async function (this: This, ...args: Args) {
      try {
        const result = (await value.apply(this, args)) as AxiosResponse;
        const parsed = schema.safeParse(result.data);
        if (parsed.success) {
          return result;
        }

        throw new AxiosError(
          errorService.handleZodError(parsed.error),
          AXIOS_VALIDATION_ERROR,
          undefined,
          undefined,
          undefined
        );
      } catch (error) {
        throw error as AxiosError;
      }
    };
  };
}

export { ApiValidate };
