import type { ACTION } from '../constants/chatListVirtual.constant';
import type { chatDataSchema } from '@/app/(protected)/@aside/schemas/chat.schema';
import type { TKey, TZodInfer } from '@/core/models/utility.model';

type TChat = TZodInfer<typeof chatDataSchema>;

type TChatListInitialData = {
  items: readonly TChat[];
  hasMore: boolean;
};

type TChatListVirtualProps = {
  initialData: TChatListInitialData;
};

type TState = TChatListInitialData & { isLoading: boolean };

type TAction = {
  [K in TKey<typeof ACTION>]: {
    type: K;
    payload: K extends typeof ACTION.setLoading ? boolean : TChatListInitialData;
  };
}[TKey<typeof ACTION>];

export type { TChatListVirtualProps, TChat, TChatListInitialData, TAction, TState };
