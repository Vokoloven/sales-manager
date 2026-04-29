import { first, lastValueFrom, map } from 'rxjs';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { RECOVER_USER_QUERY_KEY } from '../constants/recoverUser.constant';
import { recoverUserService } from '../services/RecoverUser.service';

const recoverUser = async () =>
  lastValueFrom(
    tanstackQueryService
      .query({
        queryKey: [RECOVER_USER_QUERY_KEY],
        queryFn: () => recoverUserService.recoverUser().then(({ data }) => data)
      })
      .pipe(
        first(({ status }) => status !== 'pending'),
        map(({ data, ...rest }) => ({ data: data?.data, ...rest }))
      ).observer$
  );

export { recoverUser };
