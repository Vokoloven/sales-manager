import { chatIdPageParamsSchema } from './schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

export async function generateMetadata({ params }: TZodInfer<typeof chatIdPageParamsSchema>) {
  const { chatId } = await chatIdPageParamsSchema.shape.params.parseAsync(params);

  return {
    title: `${chatId} | Chat`,
    description: 'Chat name'
  };
}

const ChatPage = async ({ params }: TZodInfer<typeof chatIdPageParamsSchema>) => {
  const { chatId } = await chatIdPageParamsSchema.shape.params.parseAsync(params);

  return <h1>ChatPage {chatId} is created</h1>;
};

export default ChatPage;
