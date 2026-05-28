import { COOKIES } from '../constants/cookies.constant';
import { cookiesService } from './Cookies.service';
import { envServerService } from './EnvServer.service';
import type { TToken } from '../models/token.model';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

class TokenService {
  private readonly cookiesOption: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: envServerService.isProdEnv,
    sameSite: 'strict'
  };

  public getTokens = async () => {
    const accessToken = await cookiesService.get(COOKIES.accessToken);
    const refreshToken = await cookiesService.get(COOKIES.refreshToken);

    return { accessToken, refreshToken };
  };

  public setTokens = async ({ accessToken, refreshToken }: TToken) => {
    await Promise.all([
      accessToken
        ? cookiesService.set(COOKIES.accessToken, accessToken, {
            ...this.cookiesOption,
            maxAge: 60 * 5
          })
        : cookiesService.delete(COOKIES.accessToken),
      refreshToken
        ? cookiesService.set(COOKIES.refreshToken, refreshToken, {
            ...this.cookiesOption,
            maxAge: 60 * 15
          })
        : cookiesService.delete(COOKIES.refreshToken)
    ]);
  };
}

const tokenService = new TokenService();

export { tokenService };
