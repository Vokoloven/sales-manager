import { ApiError } from '@/core/errors/ApiError.error';
import { errorResponseSchema } from '../schemas/response.schema';

function CatchApiError<This>(
  _target: This,
  _context: ClassFieldDecoratorContext<This, <T>(...args: any[]) => Promise<T>>
) {
  return function (this: This, value: <T>(...args: any[]) => Promise<T>) {
    return async <T>(...args: unknown[]) => {
      try {
        return (await value(...args)) as T;
      } catch (error) {
        const safeParse = errorResponseSchema.safeParse(error);

        if (safeParse.success) {
          throw new ApiError({
            ...safeParse.data
          });
        }

        if (error instanceof Error) {
          throw error;
        }

        if (
          error &&
          typeof error === 'object' &&
          'error' in error &&
          typeof error.error === 'string'
        ) {
          throw new Error(error.error);
        }

        throw new Error('Unknown error');
      }
    };
  };
}

export { CatchApiError };
