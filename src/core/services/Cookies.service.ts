import { cookies } from 'next/headers';
import type {
  TDeleteCookies,
  TGetCookies,
  TSetCookies,
  THasCookies
} from '../models/cookies.model';
import type { TOptional } from '../models/utility.model';

class CookiesService {
  public get = async <T extends string>(...args: TGetCookies) => {
    const value = (await cookies()).get(...args)?.value as TOptional<T>;

    return value ?? null;
  };

  public set = async (...args: TSetCookies) => {
    (await cookies()).set(...args);
  };

  public delete = async (...args: TDeleteCookies) => {
    (await cookies()).delete(...args);
  };

  public has = async (name: THasCookies) => {
    return (await cookies()).has(name);
  };
}

const cookiesService = new CookiesService();

export { cookiesService };
