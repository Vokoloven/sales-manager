import z from 'zod';
import { optionSchema } from '@/core/schemas/option.schema';
import { paginationSchema, responseSchema } from '@/core/schemas/response.schema';

const scoreEnum = z.enum(['0 - 19', '20 - 39', '40 - 59', '60 - 79', '80 - 100']);

const scoreOptionSchema = z.object({
  label: scoreEnum,
  value: scoreEnum
});

const itemsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      title: z.string(),
      published: z.iso.datetime(),
      keywords: z.array(z.string()),
      score: z.number(),
      matchedCases: z.number(),
      matchedBlogs: z.number(),
      accountId: z.number(),
      presetId: z.string(),
      review: z.object().nullable()
    })
  )
});

const feedsDataSchema = z.object({
  items: itemsSchema.and(paginationSchema),
  keywordsOptions: z.array(optionSchema),
  scoreOptions: z.array(scoreOptionSchema)
});

const feedsResponseSchema = responseSchema(feedsDataSchema);

export { feedsResponseSchema, itemsSchema };
