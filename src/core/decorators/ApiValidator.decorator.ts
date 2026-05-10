import { z, type ZodType } from 'zod';
import { ApiError } from '../errors/ApiError.error';

function ApiValidator<T>(schema: ZodType<T>) {
  return function <This, Return extends T>(
    _target: This,
    _context: ClassFieldDecoratorContext<This, (...args: any[]) => Promise<Return>>
  ) {
    return function (this: This, value: (...args: any[]) => Promise<Return>) {
      return async (...args: unknown[]) => {
        try {
          const data = await value(...args);

          const safeParse = schema.safeParse(data);

          if (safeParse.success) {
            return safeParse.data;
          }

          throw new ApiError({
            data: null,
            statusCode: 502,
            success: false,
            error: { errorCode: z.prettifyError(safeParse.error) }
          });
        } catch (error) {
          if (error instanceof ApiError) {
            return error.toJSON;
          }

          throw error;
        }
      };
    };
  };
}

export { ApiValidator };
