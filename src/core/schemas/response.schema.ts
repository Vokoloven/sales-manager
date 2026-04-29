import z from 'zod';

const responseErrorSchema = z.object({
  error: z.object({
    errorCode: z.string(),
    filedsValidationErrors: z
      .object({
        name: z.string(),
        errorMessage: z.string()
      })
      .nullable(),
    paramsErrors: z
      .object({
        name: z.string(),
        value: z.string()
      })
      .nullable()
  })
});

const responseSchema = <T>(data: z.ZodType<T>) =>
  z.discriminatedUnion('success', [
    z.object({
      success: z.literal(true),
      statusCode: z.number(),
      data,
      error: z.null()
    }),
    z.object({
      success: z.literal(false),
      statusCode: z.number(),
      data: z.null(),
      error: responseErrorSchema.shape.error
    })
  ]);

export { responseSchema, responseErrorSchema };
