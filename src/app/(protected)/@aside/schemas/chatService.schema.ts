import z from 'zod';
import { responseSchema } from '@/core/schemas/response.schema';

const chatsDataSchema = z.array(
  z.object({
    accountId: z.number(),
    id: z.number(),
    name: z.string()
  })
);

const chatDataSchema = z.object({
  accountId: z.number(),
  id: z.number(),
  name: z.string()
});

const chatRequestSchema = z.object({
  name: z.string()
});

const chatsResponseSchema = responseSchema(chatsDataSchema);

const chatResponseSchema = responseSchema(chatDataSchema);

const chatDeleteResponseSchema = responseSchema(z.boolean());

export { chatsResponseSchema, chatResponseSchema, chatRequestSchema, chatDeleteResponseSchema };
