import { first, map, lastValueFrom } from 'rxjs';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { aboutService } from '../services/About.service';

const aboutAction = async () =>
  lastValueFrom(
    tanstackQueryService
      .query({
        queryKey: ['about'],
        queryFn: () => aboutService.about()
      })
      .pipe(
        first((value) => value.status !== 'pending'),
        map(({ data }) => {
          return { data: data?.data };
        })
      ).observer$
  );

export { aboutAction };
