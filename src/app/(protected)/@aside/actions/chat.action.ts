'use server';

import { cacheTag, revalidateTag } from 'next/cache';
import { API_URL } from '@/core/constants/apiURL.constant';
import { apiService } from '@/core/services/ApiService.service';
import { chatService } from '../services/Chat.service';
import type { TChatRequest } from '../models/chat.model';
import type { chatsResponseSchema } from '../schemas/chatService.schema';
import type { TToken } from '@/core/models/token.model';
import type { TZodInfer } from '@/core/models/utility.model';

const getChatsAction = async (accessToken: TToken['accessToken']) => {
  'use cache';
  cacheTag('chats');
  return apiService(accessToken).api<TZodInfer<typeof chatsResponseSchema>>(API_URL.chats);
};

const renameChatAction = async (params: TChatRequest) => {
  await chatService.renameChat(params);
  revalidateTag('chats', { expire: 0 });
};

const deleteChatAction = async (id: string) => {
  await chatService.deleteChat(id);
  revalidateTag('chats', { expire: 0 });
};

export { getChatsAction, renameChatAction, deleteChatAction };
