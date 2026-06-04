import z from 'zod';
import { paginationSchema, responseSchema } from '@/core/schemas/response.schema';

const chatsDataSchema = z.array(
  z.object({
    accountId: z.number(),
    id: z.number(),
    name: z.string()
  })
);

const chatsPaginatedDataSchema = paginationSchema.extend({
  items: chatsDataSchema
});

const chatDataSchema = z.object({
  accountId: z.number(),
  id: z.number(),
  name: z.string()
});

const chatRequestSchema = z.object({
  name: z.string().trim().min(1).max(50)
});

const chatsPaginatedResponseSchema = responseSchema(chatsPaginatedDataSchema);

const chatResponseSchema = responseSchema(chatDataSchema);

const chatDeleteResponseSchema = responseSchema(z.boolean());

export {
  chatResponseSchema,
  chatRequestSchema,
  chatDeleteResponseSchema,
  chatsPaginatedResponseSchema,
  chatDataSchema
};
