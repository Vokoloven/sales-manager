import { redirect } from 'next/navigation';
import { loginResponseSchema } from '@/app/(public)/login/schemas/login.schema';
import { API_URL } from '../constants/apiURL.constant';
import { APP_PATH } from '../constants/appPath.constant';
import { CONTENT_TYPE, HTTP_HEADER, HTTP_METHOD } from '../constants/fetchService.constant';
import { ApiValidator } from '../decorators/ApiValidator.decorator';
import { CatchApiError } from '../decorators/CatchApiError.decorator';
import { envServerService } from './EnvServer.service';
import { tokenService } from './Token.service';
import type { TRequestInit } from '../models/fetchService.model';
import type { TToken } from '../models/token.model';
import type { TZodInfer } from '../models/utility.model';

class ApiService {
  private accessToken: TToken['accessToken'] = null;

  @ApiValidator(loginResponseSchema)
  public refreshAccessToken = async (refreshToken: TToken['refreshToken']) => {
    return await this.api<TZodInfer<typeof loginResponseSchema>>(API_URL.refreshToken, {
      body: JSON.stringify({ token: refreshToken }),
      method: HTTP_METHOD.PUT
    });
  };

  @CatchApiError
  public api = async <T>(url: string, init?: TRequestInit) => {
    if (!this.accessToken) {
      const { accessToken } = await tokenService().getTokens();
      this.accessToken = accessToken;
    }

    const response = await fetch(`${envServerService.env.API_URL}${url}`, {
      ...init,
      headers: {
        [HTTP_HEADER.ContentType]: CONTENT_TYPE.JSON,
        [HTTP_HEADER.Accept]: CONTENT_TYPE.JSON,
        ...(this.accessToken && {
          [HTTP_HEADER.Authorization]: `Bearer ${this.accessToken}`
        }),
        ...init?.headers
      }
    });

    if (response.status === 401) {
      redirect(APP_PATH.login);
    }

    const json = (await response.json()) as T;

    if (!response.ok) {
      throw json as unknown;
    }

    return json;
  };
}

const apiService = () => {
  return new ApiService();
};

export { apiService };
