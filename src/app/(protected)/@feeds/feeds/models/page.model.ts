import type { feedsPageSearchParamsSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TFeedsPageParsedSearchParams = TZodInfer<typeof feedsPageSearchParamsSchema>;

type TPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type { TFeedsPageParsedSearchParams, TPageProps };
