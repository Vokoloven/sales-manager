import { first, map, lastValueFrom } from 'rxjs';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { aboutService } from '../services/About.service';

const aboutAction = async () =>
  lastValueFrom(
    tanstackQueryService
      .query({
        queryKey: ['about'],
        queryFn: () => aboutService.about().then(({ data }) => data)
      })
      .pipe(
        first((value) => value.status !== 'pending'),
        map(({ data, ...rest }) => ({ data: data?.data, ...rest }))
      ).observer$
  );

export { aboutAction };
