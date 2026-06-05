import z from 'zod';
import { paginationSchema, responseSchema } from '@/core/schemas/response.schema';

const messageRequsetSchema = z.object({ chatId: z.number(), content: z.string() });

const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  isBot: z.boolean(),
  created: z.iso.datetime(),
  chatId: z.number(),
  accountId: z.number()
});

const paginatedMessagesDataSchema = paginationSchema.extend({
  items: z.array(messageSchema)
});

const paginatedMessagesResponseSchema = responseSchema(paginatedMessagesDataSchema);

const messageResponseSchema = responseSchema(z.boolean());

export {
  paginatedMessagesResponseSchema,
  messageRequsetSchema,
  messageResponseSchema,
  messageSchema
};
