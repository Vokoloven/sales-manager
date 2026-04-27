import type { TZodInfer } from './utility.model';
import type { tokenSchema } from '@/core/schemas/tokenService.schema';

type TToken = TZodInfer<typeof tokenSchema>;

export type { TToken };
