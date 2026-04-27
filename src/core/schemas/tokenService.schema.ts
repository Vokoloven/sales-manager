import z from 'zod';
import { TOKENS } from '../constants/tokens.constant';

const tokenSchema = z.object({
  [TOKENS.accessToken]: z.string().nullable(),
  [TOKENS.refreshToken]: z.string().nullable()
});

export { tokenSchema };
