import { cookies } from 'next/headers';
import { TOKEN } from '../constants/token.constant';
import { envServerService } from './EnvServer.service';
import type { TToken } from '../models/token.model';

class TokenService {
  public getTokens = async () => {
    const accessToken = (await cookies()).get(TOKEN.accessToken)?.value ?? null;
    const refreshToken = (await cookies()).get(TOKEN.refreshToken)?.value ?? null;
    return { accessToken, refreshToken };
  };

  public setTokens = async ({ accessToken, refreshToken }: TToken) => {
    if (accessToken) {
      (await cookies()).set(TOKEN.accessToken, accessToken, {
        httpOnly: true,
        secure: envServerService.isProdEnv,
        sameSite: 'strict',
        maxAge: 60 * 5
      });
    } else {
      (await cookies()).delete(TOKEN.accessToken);
    }

    if (refreshToken) {
      (await cookies()).set(TOKEN.refreshToken, refreshToken, {
        httpOnly: true,
        secure: envServerService.isProdEnv,
        sameSite: 'strict',
        maxAge: 60 * 15
      });
    } else {
      (await cookies()).delete(TOKEN.refreshToken);
    }
  };
}

const tokenService = () => new TokenService();

export { tokenService };
