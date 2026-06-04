import z from 'zod';
import { SORT_DIRECTION } from '../constants/request.constant';

const requestSchema = z.object({
  pageSize: z.number(),
  pageNumber: z.number(),
  searchParameters: z
    .array(
      z.object({
        searchQuery: z.string(),
        searchBy: z.string()
      })
    )
    .optional(),
  sortDirection: z.enum(SORT_DIRECTION).optional(),
  sortBy: z.string().optional()
});

export { requestSchema };
