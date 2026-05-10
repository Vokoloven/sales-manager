import type { TZodInfer } from '@/core/models/utility.model';
import type { errorResponseSchema } from '@/core/schemas/response.schema';

class ApiError extends Error {
  public readonly statusCode: number;
  public readonly data: null;
  public readonly success: false;
  public readonly error: TZodInfer<typeof errorResponseSchema>['error'];

  public constructor(response: TZodInfer<typeof errorResponseSchema>) {
    super(response.error.errorCode);
    this.name = 'ApiError';
    this.statusCode = response.statusCode;
    this.data = response.data;
    this.success = response.success;
    this.error = response.error;
  }

  public get toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      success: this.success,
      error: this.error
    };
  }
}

export { ApiError };
