import type { ACTION } from '../constants/chatView.constant';
import type { messageSchema } from '@/app/(protected)/@feeds/chat/[chatId]/schemas/message.schema';
import type { TKey, TZodInfer } from '@/core/models/utility.model';

type TMessage = TZodInfer<typeof messageSchema>;

type TMessagesInitialData = {
  items: readonly TMessage[];
  hasMore: boolean;
};

type TState = TMessagesInitialData & { isLoading: boolean };

type TAction = {
  [K in TKey<typeof ACTION>]: {
    type: K;
    payload: K extends typeof ACTION.setLoading ? boolean : TMessagesInitialData;
  };
}[TKey<typeof ACTION>];

type TChatViewProps = {
  chatId: string;
  initialData: TMessagesInitialData;
};

export type { TMessage, TMessagesInitialData, TState, TAction, TChatViewProps };
