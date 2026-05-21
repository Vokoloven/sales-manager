import type { itemsSchema, feedsResponseSchema } from '../schemas/feeds.schema';
import type { feedsPageSearchParamsSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TFeedItem = TZodInfer<typeof itemsSchema.shape.items.element>;

type TFeedsPageProps = Readonly<{
  data: TZodInfer<typeof feedsResponseSchema>;
  parsedSearchParams: TZodInfer<typeof feedsPageSearchParamsSchema>;
}>;

export type { TFeedItem, TFeedsPageProps };
