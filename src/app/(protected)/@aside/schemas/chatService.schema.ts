import z from 'zod';
import { responseSchema } from '@/core/schemas/response.schema';

const chatsDataSchema = z.array(
  z.object({
    accountId: z.number(),
    id: z.number(),
    name: z.string()
  })
);

const chatsResponseSchema = responseSchema(chatsDataSchema);

export { chatsResponseSchema };
