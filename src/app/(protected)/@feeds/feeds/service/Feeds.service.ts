import { API_URL } from '@/core/constants/apiURL.constant';
import { HTTP_METHOD } from '@/core/constants/fetchService.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { feedsResponseSchema } from '../schemas/feeds.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class FeedsService {
  @ApiValidator(feedsResponseSchema)
  public getFeeds = () =>
    apiService().api<TZodInfer<typeof feedsResponseSchema>>(API_URL.feeds, {
      method: HTTP_METHOD.POST,
      body: JSON.stringify({ pageSize: 50, pageNumber: 1 })
    });
}

const feedsService = new FeedsService();

export { feedsService };
