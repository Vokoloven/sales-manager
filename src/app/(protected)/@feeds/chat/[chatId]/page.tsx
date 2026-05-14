import type { TParams } from '@/core/models/page.model';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: TParams<'chatId'>): Promise<Metadata> {
  const { chatId } = await params;

  return {
    title: `${chatId} | Chat`,
    description: 'Chat name'
  };
}

const ChatPage = async ({ params }: TParams<'chatId'>) => {
  const { chatId } = await params;
  return <h1>ChatPage {chatId} is created</h1>;
};

export default ChatPage;
