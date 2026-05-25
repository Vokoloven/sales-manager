import type { TParams } from '@/core/models/params.model';

const generateMetadata = async ({ params }: TParams<'chatId'>) => {
  const { chatId } = await params;
  return {
    title: `${chatId} | Chat`,
    description: 'Chat name'
  };
};

const ChatPage = async ({ params }: TParams<'chatId'>) => {
  const { chatId } = await params;
  return <h1>ChatPage {chatId} is created</h1>;
};

export { generateMetadata };

export default ChatPage;
