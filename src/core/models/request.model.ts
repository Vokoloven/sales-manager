import type { TZodInfer } from './utility.model';
import type { requestSchema } from '../schemas/request.schema';

type TRequest = TZodInfer<typeof requestSchema>;

export type { TRequest };
