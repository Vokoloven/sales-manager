import type { loginSchema } from '../schemas/login.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TLogin = TZodInfer<typeof loginSchema>;

export type { TLogin };
