import type { searchFilterSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TSearchFilter = TZodInfer<typeof searchFilterSchema>;

export type { TSearchFilter };
