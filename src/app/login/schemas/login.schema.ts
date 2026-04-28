import z from 'zod';
import { TOKENS } from '@/core/constants/tokens.constant';
import { errorSchema } from '@/shared/schemas/error.schema';
import { LOGIN_FORM_FIELD } from '../constants/login.constant';

const loginSchema = z.object({
  [LOGIN_FORM_FIELD.email]: z.email({ pattern: z.regexes.rfc5322Email }),
  [LOGIN_FORM_FIELD.password]: z.string().min(5)
});

const loginResponseSchema = z
  .object({
    data: z.object({
      access: z.object({
        [TOKENS.accessToken]: z.string(),
        [TOKENS.refreshToken]: z.string()
      })
    })
  })
  .and(errorSchema);

export { loginSchema, loginResponseSchema };
