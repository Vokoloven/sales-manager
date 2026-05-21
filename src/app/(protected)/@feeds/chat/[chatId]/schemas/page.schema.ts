import z from 'zod';

const chatIdPageParamsSchema = z.object({
  params: z.promise(z.record(z.literal('chatId'), z.string()))
});

export { chatIdPageParamsSchema };
