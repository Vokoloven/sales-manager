import type { feedsPageSearchParamsSchema, searchFilterSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TFeedsPageParsedSearchParams = TZodInfer<typeof feedsPageSearchParamsSchema>;

type TFeedsServiceParams = Omit<TFeedsPageParsedSearchParams, 'sp'> & {
  searchParameters?: TZodInfer<typeof searchFilterSchema>[];
};

export type { TFeedsPageParsedSearchParams, TFeedsServiceParams };
