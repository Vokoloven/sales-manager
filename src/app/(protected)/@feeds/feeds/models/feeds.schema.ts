import type { itemsSchema, feedsResponseSchema } from '../schemas/feeds.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TItem = TZodInfer<typeof itemsSchema.shape.items.element>;
type TFeedsReponseSchema = TZodInfer<typeof feedsResponseSchema>;

export type { TItem, TFeedsReponseSchema };
