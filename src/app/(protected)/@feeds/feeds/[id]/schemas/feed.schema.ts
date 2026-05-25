import z from 'zod';
import { responseSchema } from '@/core/schemas/response.schema';
import { itemsSchema } from '../../schemas/feeds.schema';

const feedSchema = itemsSchema.shape.items.element.extend({
  matchedCasesData: z.array(
    z.object({
      docId: z.string(),
      webDocId: z.number().optional(),
      title: z.string().optional(),
      link: z.string(),
      content: z.string(),
      selected: z.boolean(),
      score: z.number(),
      infoBlock: z
        .array(
          z.object({
            key: z.string(),
            value: z.string()
          })
        )
        .optional(),
      explanation: z.string().optional()
    })
  ),
  matchedBlogsData: z.array(
    z.object({
      docId: z.string(),
      webDocId: z.number().optional(),
      title: z.string().optional(),
      link: z.string(),
      content: z.string(),
      selected: z.boolean(),
      score: z.number(),
      infoBlock: z
        .array(
          z.object({
            key: z.string(),
            value: z.string()
          })
        )
        .optional(),
      explanation: z.string().optional()
    })
  )
});

const feedResponseSchema = responseSchema(feedSchema);

export { feedResponseSchema };
