import { API_URL } from '@/core/constants/apiURL.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { aboutResponseSchema } from '../schemas/about.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class AboutService {
  @ApiValidator(aboutResponseSchema)
  public about = () => apiService().api<TZodInfer<typeof aboutResponseSchema>>(API_URL.about);
}

const aboutService = new AboutService();

export { aboutService };
