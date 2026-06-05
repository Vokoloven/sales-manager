'use server';

import { revalidateTag } from 'next/cache';
import { CHAT_TAG } from '../constants/chat.constant';
import { chatService } from '../services/Chat.service';
import type { chatRequestSchema } from '../schemas/chat.schema';
import type { TZodInfer } from '@/core/models/utility.model';

const getPaginatedChatsAction = async (pageNumber: number) =>
  chatService.getPaginatedChats(pageNumber);

const renameChatAction = async (params: TZodInfer<typeof chatRequestSchema> & { id: string }) => {
  await chatService.renameChat(params);
  revalidateTag(CHAT_TAG.chats, { expire: 0 });
};

const deleteChatAction = async (id: string) => {
  await chatService.deleteChat(id);
  revalidateTag(CHAT_TAG.chats, { expire: 0 });
};

export { getPaginatedChatsAction, renameChatAction, deleteChatAction };
