import type { feedsPageSearchParamsSchema, searchFilterSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TFeedsPageParsedSearchParams = TZodInfer<typeof feedsPageSearchParamsSchema>;

type TFeedsServiceParams = Omit<TFeedsPageParsedSearchParams, 'sp'> & {
  searchParameters?: TZodInfer<typeof searchFilterSchema>[];
};

type TPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type { TFeedsPageParsedSearchParams, TFeedsServiceParams, TPageProps };
