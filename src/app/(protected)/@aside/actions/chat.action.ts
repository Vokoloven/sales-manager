'use server';

import { cacheTag, revalidateTag } from 'next/cache';
import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetch.constant';
import { SORT_DIRECTION } from '@/core/constants/request.constant';
import { apiService } from '@/core/services/ApiService.service';
import { CHAT_PAGE_SIZE, CHAT_TAG } from '../constants/chat.constant';
import { chatService } from '../services/Chat.service';
import type { chatsPaginatedResponseSchema } from '../schemas/chat.schema';
import type { chatRequestSchema } from '../schemas/chat.schema';
import type { TToken } from '@/core/models/token.model';
import type { TZodInfer } from '@/core/models/utility.model';

const getCachedPaginatedChats = async (accessToken: TToken['accessToken'], pageNumber: number) => {
  'use cache';
  cacheTag(CHAT_TAG.chats);
  return apiService(accessToken).api<TZodInfer<typeof chatsPaginatedResponseSchema>>(
    API_URL.chatsPaginated,
    {
      method: HTTP_METHOD.POST,
      body: JSON.stringify({
        pageNumber,
        pageSize: CHAT_PAGE_SIZE,
        sortDirection: SORT_DIRECTION.desc
      })
    }
  );
};

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

export { getCachedPaginatedChats, getPaginatedChatsAction, renameChatAction, deleteChatAction };
