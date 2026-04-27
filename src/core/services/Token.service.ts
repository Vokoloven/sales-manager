import { URL } from '@/core/constants/url.constant';
import { ApiValidate } from '@/core/decorators/ApiValidate.decorator';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import { tokenSchema } from '@/core/schemas/tokenService.schema';
import { getTokens } from '../actions/tokens.action';
import { apiService } from './Api.service';
import type { TToken } from '@/core/models/tokenService.model';

@Singleton
class TokenService {
  @ApiValidate(tokenSchema)
  public async refreshToken() {
    const tokens = await getTokens();

    return apiService.post<TToken>({
      url: URL.tokenRefresh,
      dto: { refreshToken: tokens.refreshToken }
    });
  }
}

const tokenService = new TokenService();

export { tokenService };
