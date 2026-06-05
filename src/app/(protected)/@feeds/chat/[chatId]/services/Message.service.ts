import { CHAT_PAGE_SIZE } from '@/app/(protected)/@aside/constants/chat.constant';
import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetch.constant';
import { SORT_DIRECTION } from '@/core/constants/request.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { paginatedMessagesResponseSchema } from '../schemas/message.schema';
import type { messageRequsetSchema } from '../schemas/message.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class MessageService {
  @ApiValidator(paginatedMessagesResponseSchema)
  public getPaginatedMessages = async (chatId: string, pageNumber: number) =>
    apiService().api<TZodInfer<typeof paginatedMessagesResponseSchema>>(
      API_URL.messagesPaginated.replace('{{chatId}}', chatId),
      {
        method: HTTP_METHOD.POST,
        body: JSON.stringify({
          pageNumber,
          pageSize: CHAT_PAGE_SIZE,
          sortDirection: SORT_DIRECTION.desc
        })
      }
    );

  public sendMessage = (params: TZodInfer<typeof messageRequsetSchema>) =>
    apiService().api<TZodInfer<typeof paginatedMessagesResponseSchema>>(API_URL.sendMessage, {
      method: HTTP_METHOD.POST,
      body: JSON.stringify(params)
    });
}

const messageService = new MessageService();

export { messageService };
