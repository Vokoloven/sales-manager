import z from 'zod';
import { searchParamValueSchema } from '@/core/schemas/searchParamsValue.schema';

const searchBySchema = z.enum(['title', 'published', 'keywords', 'score']);

const searchFilterSchema = z.object({
  searchQuery: z.string(),
  searchBy: searchBySchema
});

const feedsPageSearchParamsSchema = z.object({
  pageSize: searchParamValueSchema,
  pageNumber: searchParamValueSchema,
  sortDirection: searchParamValueSchema,
  sortBy: searchParamValueSchema,
  sp: searchParamValueSchema
});

export { feedsPageSearchParamsSchema, searchBySchema, searchFilterSchema };
