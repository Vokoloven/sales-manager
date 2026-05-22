import type { TFeedsServiceParams } from './page.model';
import type { itemsSchema, feedsResponseSchema } from '../schemas/feeds.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TFeedItem = TZodInfer<typeof itemsSchema.shape.items.element>;

type TFeedsPageProps = Readonly<{
  data: TZodInfer<typeof feedsResponseSchema>;
  parsedSearchParams: TFeedsServiceParams;
}>;

export type { TFeedItem, TFeedsPageProps };
