import { concatMap, from, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { apiService } from '@/core/services/Api.service';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { tokenService } from '@/core/services/Token.service';
import { setTokens } from '../actions/tokens.action';

class RefreshTokenMutation {
  public refreshToken() {
    return tanstackQueryService
      .mutation({
        mutationFn: () => tokenService.refreshToken()
      })
      .pipe(
        concatMap(({ mutate }) => from(mutate())),
        shareReplay({
          bufferSize: 1,
          refCount: true
        }),
        take(1),
        switchMap((value) => from(setTokens(value.data)).pipe(map(() => value))),
        tap({
          next: ({ data: tokens }) => {
            if (tokens.accessToken)
              apiService.api.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
          }
        })
      );
  }
}

const refreshTokenMutation = new RefreshTokenMutation();

export { refreshTokenMutation };
