import { URL } from '@/core/constants/url.constant';
import { ApiValidate } from '@/core/decorators/ApiValidate.decorator';
import { apiService } from '@/core/services/Api.service';
import { aboutResponseSchema } from '../schemas/about.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class AboutService {
  @ApiValidate(aboutResponseSchema)
  public about() {
    return apiService.get<TZodInfer<typeof aboutResponseSchema>>({
      url: URL.about
    });
  }
}

const aboutService = new AboutService();

export { aboutService };
