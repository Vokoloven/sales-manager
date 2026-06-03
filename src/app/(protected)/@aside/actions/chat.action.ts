'use server';

import { cacheTag, revalidateTag } from 'next/cache';
import { API_URL } from '@/core/constants/apiURL.constant';
import { apiService } from '@/core/services/ApiService.service';
import { CHAT_TAG } from '../constants/chat.constant';
import { chatService } from '../services/Chat.service';
import type { chatRequestSchema, chatsResponseSchema } from '../schemas/chat.schema';
import type { TToken } from '@/core/models/token.model';
import type { TZodInfer } from '@/core/models/utility.model';

const getChatsAction = async (accessToken: TToken['accessToken']) => {
  'use cache';
  cacheTag(CHAT_TAG.chats);
  return apiService(accessToken).api<TZodInfer<typeof chatsResponseSchema>>(API_URL.chats);
};

const renameChatAction = async (params: TZodInfer<typeof chatRequestSchema> & { id: string }) => {
  await chatService.renameChat(params);
  revalidateTag(CHAT_TAG.chats, { expire: 0 });
};

const deleteChatAction = async (id: string) => {
  await chatService.deleteChat(id);
  revalidateTag(CHAT_TAG.chats, { expire: 0 });
};

export { getChatsAction, renameChatAction, deleteChatAction };
