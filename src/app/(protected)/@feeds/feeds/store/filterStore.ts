import type { searchFilterSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

const filterStore = new Map<string, TZodInfer<typeof searchFilterSchema>[]>();

export { filterStore };
