import z from 'zod';

const chatPageParamsSchema = z.object({
  chatId: z.string().regex(/^\d+$/)
});

export { chatPageParamsSchema };
