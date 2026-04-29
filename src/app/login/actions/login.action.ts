import { concatMap, firstValueFrom, from } from 'rxjs';
import { setTokens } from '@/core/actions/tokens.action';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { loginService } from '../services/Login.service';
import type { TLogin } from '../models/login.model';

const loginAction = ({
  dto,
  onSuccess,
  onSettled
}: {
  dto: TLogin;
  onSuccess: VoidFunction;
  onSettled: VoidFunction;
}) =>
  firstValueFrom(
    tanstackQueryService
      .mutation({
        mutationFn: (variables: TLogin) => loginService.login(variables),
        onSuccess: async ({ data: { data, success } }) => {
          if (success) await setTokens(data.access);
          onSuccess();
        },
        onSettled
      })
      .pipe(concatMap(({ mutate }) => from(mutate(dto)))).observer$
  );

export { loginAction };
