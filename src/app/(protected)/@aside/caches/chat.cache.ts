'use cache';

import { cacheTag } from 'next/cache';
import { API_URL } from '@/core/constants/apiURL.constant';
import { apiService } from '@/core/services/ApiService.service';
import type { chatsResponseSchema } from '../schemas/chatService.schema';
import type { TToken } from '@/core/models/token.model';
import type { TZodInfer } from '@/core/models/utility.model';

const cacheGetChats = async (accessToken: TToken['accessToken']) => {
  cacheTag('chats');
  return apiService(accessToken).api<TZodInfer<typeof chatsResponseSchema>>(API_URL.chats);
};

export { cacheGetChats };
