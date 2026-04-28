import { URL } from '@/core/constants/url.constant';
import { ApiValidate } from '@/core/decorators/ApiValidate.decorator';
import { apiService } from '@/core/services/Api.service';
import { loginResponseSchema } from '../schemas/login.schema';
import type { TLogin } from '../models/login.model';
import type { TZodInfer } from '@/core/models/utility.model';

class LoginService {
  @ApiValidate(loginResponseSchema)
  public login(dto: TLogin) {
    return apiService.post<TZodInfer<typeof loginResponseSchema>>({
      url: URL.login,
      dto
    });
  }
}

const loginService = new LoginService();

export { loginService };
