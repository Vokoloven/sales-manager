'use server';

import { revalidateTag } from 'next/cache';
import { chatService } from '@/app/(protected)/@aside/services/Chat.service';
import type { chatRequestSchema } from '@/app/(protected)/@aside/schemas/chat.schema';
import type { TZodInfer } from '@/core/models/utility.model';

const createChatAction = async (name: TZodInfer<typeof chatRequestSchema>) => {
  const result = await chatService.createChat(name);
  revalidateTag('chats', { expire: 0 });
  return result;
};

export { createChatAction };
