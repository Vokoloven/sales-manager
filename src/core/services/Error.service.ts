import { z } from 'zod';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import type { AxiosError } from 'axios';

@Singleton
class ErrorService {
  public handleZodError = <T>(error: z.ZodError<T>) => {
    const flattened = z.flattenError(error);

    return Object.entries(flattened.fieldErrors)
      .map(([key, value]) => {
        let message = 'Validation failed';

        if (Array.isArray(value) && typeof value[0] === 'string') {
          message = `${key.toUpperCase()}: ${value[0]}`;
        }

        return message;
      })
      .join(', ');
  };

  public handleAxiosError = (error: unknown) => {
    const axiosError = error as AxiosError<{ message: string }>;
    const message = axiosError.response?.data.message ?? (axiosError.message || 'Unknown error');

    return message;
  };
}

const errorService = new ErrorService();

export { errorService };
