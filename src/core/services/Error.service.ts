import { z } from 'zod';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import type { AxiosError } from 'axios';

@Singleton
class ErrorService {
  public handleZodError = <T>(error: z.ZodError<T>) => z.prettifyError(error);

  public handleAxiosError = (error: unknown) => {
    const axiosError = error as AxiosError<{ message: string }>;
    const message = axiosError.response?.data.message ?? (axiosError.message || 'Unknown error');

    return message;
  };
}

const errorService = new ErrorService();

export { errorService };
