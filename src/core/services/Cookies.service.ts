import { cookies } from 'next/headers';
import type {
  TDeleteCookies,
  TGetCookies,
  TSetCookies,
  THasCookies
} from '../models/cookies.model';

class CookiesService {
  public get = async (...args: TGetCookies) => {
    const value = (await cookies()).get(...args)?.value;

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
