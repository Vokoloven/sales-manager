import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetch.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { tokenService } from '@/core/services/Token.service';
import { cacheGetChats } from '../caches/chat.cache';
import { chatsResponseSchema } from '../schemas/chatService.schema';
import { chatResponseSchema } from '../schemas/chatService.schema';
import type { chatRequestSchema } from '../schemas/chatService.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class ChatService {
  @ApiValidator(chatsResponseSchema)
  public getChats = async () => {
    const { accessToken } = await tokenService.getTokens();
    return cacheGetChats(accessToken);
  };

  @ApiValidator(chatResponseSchema)
  public createChat = (name: TZodInfer<typeof chatRequestSchema>) =>
    apiService().api<TZodInfer<typeof chatResponseSchema>>(API_URL.chats, {
      method: HTTP_METHOD.POST,
      body: JSON.stringify(name)
    });
}

const chatService = new ChatService();

export { chatService };
