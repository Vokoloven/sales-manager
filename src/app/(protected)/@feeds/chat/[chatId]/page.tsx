import { notFound } from 'next/navigation';
import { chatService } from '@/app/(protected)/@aside/services/Chat.service';
import { getPaginatedMessagesAction } from './actions/message.action';
import ChatView from './components/ChatView/ChatView';
import { chatPageParamsSchema } from './schemas/page.schema';
import type { TParams } from '@/core/models/params.model';
import type { Metadata } from 'next';

const generateMetadata = async ({ params }: TParams): Promise<Metadata> => {
  const rawParams = await params;

  const safeParse = chatPageParamsSchema.safeParse(rawParams);

  if (!safeParse.success) {
    return { title: 'Chat', description: 'View and manage your chat' };
  }

  const result = await chatService.getChat(safeParse.data.chatId);

  return {
    title: `${result.data?.name ?? safeParse.data.chatId} | Chat`,
    description: `View and manage your chat${result.data?.name ? `: ${result.data.name}` : ''}`
  };
};

const ChatPage = async ({ params }: TParams) => {
  const rawParams = await params;

  const safeParse = chatPageParamsSchema.safeParse(rawParams);

  if (!safeParse.success) {
    return notFound();
  }

  const { chatId } = safeParse.data;
  const result = await getPaginatedMessagesAction(chatId, 1);

  const initialData = result.success
    ? {
        items: [...result.data.items].reverse(),
        hasMore: result.data.pageNumber < result.data.totalPages
      }
    : { items: [], hasMore: false };

  return <ChatView chatId={chatId} initialData={initialData} />;
};

export { generateMetadata };

export default ChatPage;
