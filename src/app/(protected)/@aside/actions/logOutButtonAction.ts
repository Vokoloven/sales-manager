'use server';

import { redirect } from 'next/navigation';
import { APP_PATH } from '@/core/constants/appPath.constant';
import { TOKENS_INITIAL_STATE } from '@/core/constants/token.constant';
import { tokenService } from '@/core/services/Token.service';

const logOutButtonAction = async () => {
  await tokenService.setTokens(TOKENS_INITIAL_STATE);
  redirect(APP_PATH.base);
};

export { logOutButtonAction };
