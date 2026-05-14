import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetchService.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { loginResponseSchema } from '../schemas/login.schema';
import type { TLogin } from '../models/login.model';
import type { TZodInfer } from '@/core/models/utility.model';

class LoginService {
  @ApiValidator(loginResponseSchema)
  public login = (dto: TLogin) =>
    apiService().api<TZodInfer<typeof loginResponseSchema>>(API_URL.login, {
      method: HTTP_METHOD.POST,
      body: JSON.stringify(dto)
    });
}

const loginService = new LoginService();

export { loginService };
