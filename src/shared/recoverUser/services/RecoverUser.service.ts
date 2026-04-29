import { URL } from '@/core/constants/url.constant';
import { ApiValidate } from '@/core/decorators/ApiValidate.decorator';
import { apiService } from '@/core/services/Api.service';
import { recoverUserResponseSchema } from '../schemas/recoverUser.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class RecoverUserService {
  @ApiValidate(recoverUserResponseSchema)
  public recoverUser() {
    return apiService.get<TZodInfer<typeof recoverUserResponseSchema>>({
      url: URL.recoverUser
    });
  }
}

const recoverUserService = new RecoverUserService();

export { recoverUserService };
