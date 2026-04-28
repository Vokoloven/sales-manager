import { setTokens } from '@/core/actions/tokens.action';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import { loginService } from '../services/Login.service';
import type { TLogin } from '../models/login.model';

class LoginMutation {
  public login = tanstackQueryService.mutation({
    mutationFn: (variables: TLogin) => loginService.login(variables),
    onSuccess: async ({
      data: {
        data: { access }
      }
    }) => {
      await setTokens(access);
    }
  });
}

const loginMutation = new LoginMutation();

export { loginMutation };
