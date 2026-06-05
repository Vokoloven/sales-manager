'use cache';

import { cacheTag } from 'next/cache';
import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetch.constant';
import { SORT_DIRECTION } from '@/core/constants/request.constant';
import { apiService } from '@/core/services/ApiService.service';
import { CHAT_PAGE_SIZE, CHAT_TAG } from '../constants/chat.constant';
import type { chatsPaginatedResponseSchema } from '../schemas/chat.schema';
import type { TToken } from '@/core/models/token.model';
import type { TZodInfer } from '@/core/models/utility.model';

const getCachedPaginatedChats = async (accessToken: TToken['accessToken'], pageNumber: number) => {
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

export { getCachedPaginatedChats };
