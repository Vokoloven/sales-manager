'use server';

import { messageService } from '../services/Message.service';
import type { messageRequsetSchema } from '../schemas/message.schema';
import type { TZodInfer } from '@/core/models/utility.model';

const getPaginatedMessagesAction = async (chatId: string, pageNumber: number) =>
  messageService.getPaginatedMessages(chatId, pageNumber);

const sendMessageAction = async (params: TZodInfer<typeof messageRequsetSchema>) => {
  return messageService.sendMessage(params);
};

export { getPaginatedMessagesAction, sendMessageAction };
