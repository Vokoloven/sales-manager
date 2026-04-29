import z from 'zod';
import { recoverUserDataSchema } from '@/shared/recoverUser/schemas/recoverUser.schema';
import { TOKENS } from '../constants/tokens.constant';
import { responseSchema } from './response.schema';

const tokenSchema = z.object({
  [TOKENS.accessToken]: z.string().nullable(),
  [TOKENS.refreshToken]: z.string().nullable()
});

const tokenDataSchema = z
  .object({
    access: z.object({
      accessToken: z.string(),
      refreshToken: z.string()
    })
  })
  .and(recoverUserDataSchema);

const tokenResponseSchema = responseSchema(tokenDataSchema);

export { tokenSchema, tokenResponseSchema };
