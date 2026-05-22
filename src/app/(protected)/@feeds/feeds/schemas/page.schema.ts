import z from 'zod';
import { PAGE_SIZE } from '../components/Pagination/constants/pagination.constant';

const searchBySchema = z.enum(['title', 'published', 'keywords', 'score']);

const pageSizeSchema = z.enum(PAGE_SIZE);

const searchFilterSchema = z.object({
  searchQuery: z.string(),
  searchBy: searchBySchema
});

const feedsPageSearchParamsSchema = z.object({
  pageSize: pageSizeSchema,
  pageNumber: z.string(),
  sortDirection: z.string().optional(),
  sortBy: z.string().optional(),
  sp: z.string().optional()
});

export { feedsPageSearchParamsSchema, searchBySchema, searchFilterSchema };
