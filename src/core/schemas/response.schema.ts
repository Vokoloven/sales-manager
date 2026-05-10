import z from 'zod';
import type { ZodType } from 'zod';

const errorSchema = z.object({
  error: z.object({
    errorCode: z.string(),
    filedsValidationErrors: z
      .array(
        z.object({
          name: z.string(),
          errorMessage: z.string()
        })
      )
      .nullable()
      .optional(),
    paramsErrors: z
      .array(
        z.object({
          name: z.string(),
          value: z.string()
        })
      )
      .nullable()
      .optional()
  })
});

const successResponseSchema = z.object({
  success: z.literal(true),
  statusCode: z.number(),
  error: z.null()
});

const errorResponseSchema = z.object({
  success: z.literal(false),
  statusCode: z.number(),
  data: z.null(),
  error: errorSchema.shape.error
});

const responseSchema = <T>(data: ZodType<T>) =>
  z.discriminatedUnion('success', [
    successResponseSchema.extend({
      data
    }),
    errorResponseSchema
  ]);

export { errorResponseSchema, responseSchema };
