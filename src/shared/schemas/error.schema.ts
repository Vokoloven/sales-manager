import z from 'zod';

const errorSchema = z.object({
  error: z
    .object({
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
    .nullable()
});

export { errorSchema };
