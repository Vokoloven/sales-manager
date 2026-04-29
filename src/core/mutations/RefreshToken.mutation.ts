import { concatMap, from, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { apiService } from '@/core/services/Api.service';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { tokenService } from '@/core/services/Token.service';
import { setTokens } from '../actions/tokens.action';
import { TOKENS_INITIAL_STATE } from '../constants/tokens.constant';

class RefreshTokenMutation {
  public refreshToken() {
    return tanstackQueryService
      .mutation({
        mutationFn: () => tokenService.refreshToken().then(({ data }) => data)
      })
      .pipe(
        concatMap(({ mutate }) => from(mutate())),
        shareReplay({
          bufferSize: 1,
          refCount: true
        }),
        take(1),
        switchMap((data) =>
          from(setTokens(data.data ? data.data.access : TOKENS_INITIAL_STATE)).pipe(map(() => data))
        ),
        tap({
          next: ({ data }) => {
            if (data?.access.accessToken)
              apiService.api.defaults.headers.common.Authorization = `Bearer ${data.access.accessToken}`;
          }
        })
      );
  }
}

const refreshTokenMutation = new RefreshTokenMutation();

export { refreshTokenMutation };
