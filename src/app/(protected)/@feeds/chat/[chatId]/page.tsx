import { chatService } from '@/app/(protected)/@aside/services/Chat.service';
import type { TParams } from '@/core/models/params.model';

const generateMetadata = async ({ params }: TParams<'chatId'>) => {
  const { chatId } = await params;

  const result = await chatService.getChat(chatId);

  return {
    title: `${result.data?.name ?? chatId} | Chat`,
    description: `View and manage your chat${result.data?.name ? `: ${result.data.name}` : ''}`
  };
};

const ChatPage = async ({ params }: TParams<'chatId'>) => {
  const { chatId } = await params;
  return <h1>ChatPage {chatId} is created</h1>;
};

export { generateMetadata };

export default ChatPage;
