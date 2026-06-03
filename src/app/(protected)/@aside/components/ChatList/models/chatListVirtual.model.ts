import type { chatsResponseSchema } from '@/app/(protected)/@aside/schemas/chat.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TChatListVirtualProps = {
  chats: Readonly<NonNullable<TZodInfer<typeof chatsResponseSchema>['data']>>;
};

export type { TChatListVirtualProps };
