import z from 'zod';
import { TOKENS } from '@/core/constants/tokens.constant';
import { responseSchema } from '@/core/schemas/response.schema';
import { recoverUserDataSchema } from '@/shared/recoverUser/schemas/recoverUser.schema';
import { LOGIN_FORM_FIELD } from '../constants/login.constant';

const loginSchema = z.object({
  [LOGIN_FORM_FIELD.email]: z.email({ pattern: z.regexes.rfc5322Email }),
  [LOGIN_FORM_FIELD.password]: z.string().min(5)
});

const loginDataSchema = z
  .object({
    access: z.object({
      [TOKENS.accessToken]: z.string(),
      [TOKENS.refreshToken]: z.string()
    })
  })
  .and(recoverUserDataSchema);

const loginResponseSchema = responseSchema(loginDataSchema);

export { loginSchema, loginResponseSchema };
