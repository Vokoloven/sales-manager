import { API_URL } from '@/core/constants/apiURL.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { chatsResponseSchema } from '../schemas/chatService.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class ChatService {
  @ApiValidator(chatsResponseSchema)
  public getChats = () => apiService().api<TZodInfer<typeof chatsResponseSchema>>(API_URL.chats);
}

const chatService = new ChatService();

export { chatService };
