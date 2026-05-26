import { API_URL } from '@/core/constants/apiURL.constant';
import { ApiValidator } from '@/core/decorators/ApiValidator.decorator';
import { apiService } from '@/core/services/ApiService.service';
import { feedResponseSchema } from '../schemas/feed.schema';
import type { TZodInfer } from '@/core/models/utility.model';

class FeedService {
  @ApiValidator(feedResponseSchema)
  public getFeed = (id: string) =>
    apiService().api<TZodInfer<typeof feedResponseSchema>>(API_URL.feed.replace('{{id}}', id));
}

const feedService = new FeedService();

export { feedService };
