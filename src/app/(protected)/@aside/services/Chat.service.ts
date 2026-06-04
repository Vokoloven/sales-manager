import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetch.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { tokenService } from '@/core/services/Token.service';
import { getChatsAction } from '../actions/chat.action';
import {
  chatDeleteResponseSchema,
  chatsPaginatedResponseSchema,
  chatsResponseSchema
} from '../schemas/chat.schema';
import { chatResponseSchema } from '../schemas/chat.schema';
import type { chatRequestSchema } from '../schemas/chat.schema';
import type { TRequest } from '@/core/models/request.model';
import type { TZodInfer } from '@/core/models/utility.model';

class ChatService {
  @ApiValidator(chatsResponseSchema)
  public getChats = async () => {
    const { accessToken } = await tokenService.getTokens();
    return getChatsAction(accessToken);
  };

  @ApiValidator(chatsPaginatedResponseSchema)
  public getPaginatedChats = (props: TRequest) =>
    apiService().api<TZodInfer<typeof chatsPaginatedResponseSchema>>(API_URL.chatsPaginated, {
      method: HTTP_METHOD.POST,
      body: JSON.stringify(props)
    });

  @ApiValidator(chatResponseSchema)
  public getChat = (id: string) =>
    apiService().api<TZodInfer<typeof chatResponseSchema>>(API_URL.chat.replace('{{id}}', id));

  @ApiValidator(chatResponseSchema)
  public createChat = (name: TZodInfer<typeof chatRequestSchema>) =>
    apiService().api<TZodInfer<typeof chatResponseSchema>>(API_URL.chats, {
      method: HTTP_METHOD.POST,
      body: JSON.stringify(name)
    });

  @ApiValidator(chatResponseSchema)
  public renameChat = ({ name, id }: TZodInfer<typeof chatRequestSchema> & { id: string }) =>
    apiService().api<TZodInfer<typeof chatResponseSchema>>(API_URL.chat.replace('{{id}}', id), {
      method: HTTP_METHOD.PUT,
      body: JSON.stringify({ name })
    });

  @ApiValidator(chatDeleteResponseSchema)
  public deleteChat = (id: string) =>
    apiService().api<TZodInfer<typeof chatDeleteResponseSchema>>(
      API_URL.chat.replace('{{id}}', id),
      { method: HTTP_METHOD.DELETE }
    );
}

const chatService = new ChatService();

export { chatService };
