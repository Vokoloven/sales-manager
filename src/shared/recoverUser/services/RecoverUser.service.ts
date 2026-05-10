import { API_URL } from '@/core/constants/apiURL.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { CacheReact } from '@/core/decorators/CacheReact.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { recoverUserResponseSchema } from '../schemas/recoverUser.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class RecoverUserService {
  @CacheReact
  @ApiValidator(recoverUserResponseSchema)
  public recoverUser = async () =>
    apiService().api<TZodInfer<typeof recoverUserResponseSchema>>(API_URL.recoverUser);
}

const recoverUserService = new RecoverUserService();

export { recoverUserService };
