import type { TZodInfer } from './utility.model';
import type { responseErrorSchema } from '../schemas/response.schema';

type TResponseError = TZodInfer<typeof responseErrorSchema>;

export type { TResponseError };
