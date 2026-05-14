import type { TZodInfer } from './utility.model';
import type { optionSchema } from '../schemas/option.schema';

type TOption = TZodInfer<typeof optionSchema>;

export type { TOption };
