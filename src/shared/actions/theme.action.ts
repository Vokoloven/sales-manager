'use server';

import { COOKIES } from '@/core/constants/cookies.constant';
import { cookiesService } from '@/core/services/Cookies.service';
import { envServerService } from '@/core/services/EnvServer.service';
import type { TTheme } from '@/shared/components/Theme/models/theme.model';

const themeCookiesAction = async (value?: TTheme) => {
  if (value) {
    await cookiesService.set(COOKIES.theme, value, {
      httpOnly: true,
      secure: envServerService.isProdEnv,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    });
    return null;
  }
  return await cookiesService.get<NonNullable<TTheme>>(COOKIES.theme);
};

export { themeCookiesAction };
