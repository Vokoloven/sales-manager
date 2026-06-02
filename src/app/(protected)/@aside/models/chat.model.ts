import type { chatRequestSchema } from '../schemas/chatService.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TChatRequest = TZodInfer<typeof chatRequestSchema> & { id: string };

export type { TChatRequest };
