'use server';

import { tokenService } from '@/core/services/Token.service';
import { loginService } from '../services/Login.service';
import type { TLogin } from '../models/login.model';

const loginAction = async (dto: TLogin) => {
  const result = await loginService.login(dto);

  if (result.success) await tokenService.setTokens(result.data.access);

  return result;
};

export { loginAction };
