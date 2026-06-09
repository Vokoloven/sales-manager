'use server';

import { cookiesService } from '@/core/services/Cookies.service';
import { envServerService } from '@/core/services/EnvServer.service';
import type { COOKIES } from '@/core/constants/cookies.constant';
import type { TValueOf } from '@/core/models/utility.model';

const resizeCookiesAction = async (key: TValueOf<typeof COOKIES>, value?: string) => {
  if (value) {
    await cookiesService.set(key, value, {
      httpOnly: true,
      secure: envServerService.isProdEnv,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    });
  } else {
    await cookiesService.delete(key);
  }
};

export { resizeCookiesAction };
