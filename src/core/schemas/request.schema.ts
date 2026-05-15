import z from 'zod';

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
  sortDirection: z.enum(['asc', 'desc']).optional(),
  sortBy: z.string().optional()
});

export { requestSchema };
