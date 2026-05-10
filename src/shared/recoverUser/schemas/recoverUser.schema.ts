import z from 'zod';
import { responseSchema } from '@/core/schemas/response.schema';
import {
  RECOVER_USER_ACCOUNT_ROLE,
  RECOVER_USER_STATUS,
  RECOVER_USER_TYPE_AUTH
} from '../constants/recoverUser.constant';

const recoverUserDataSchema = z.object({
  account: z.object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    status: z.enum(RECOVER_USER_STATUS),
    typeAuth: z.enum(RECOVER_USER_TYPE_AUTH),
    accountRole: z.enum(RECOVER_USER_ACCOUNT_ROLE)
  }),
  sessionId: z.string()
});

const recoverUserResponseSchema = responseSchema(recoverUserDataSchema);

export { recoverUserResponseSchema, recoverUserDataSchema };
