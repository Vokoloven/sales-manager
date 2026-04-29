import { URL } from '@/core/constants/url.constant';
import { ApiValidate } from '@/core/decorators/ApiValidate.decorator';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import { tokenResponseSchema } from '@/core/schemas/tokenService.schema';
import { getTokens } from '../actions/tokens.action';
import { apiService } from './Api.service';
import type { TZodInfer } from '../models/utility.model';

@Singleton
class TokenService {
  @ApiValidate(tokenResponseSchema)
  public async refreshToken() {
    const tokens = await getTokens();

    return apiService.put<TZodInfer<typeof tokenResponseSchema>>({
      url: URL.tokenRefresh,
      dto: { token: tokens.refreshToken }
    });
  }
}

const tokenService = new TokenService();

export { tokenService };
