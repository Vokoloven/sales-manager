import type { TValueOf } from './utility.model';
import type { COOKIES } from '../constants/cookies.constant';
import type { RequestCookie, ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type TSetCookies =
  | [key: TValueOf<typeof COOKIES>, value: string, cookie?: Partial<ResponseCookie> | undefined]
  | [options: ResponseCookie];

type TGetCookies = [name: TValueOf<typeof COOKIES>] | [RequestCookie];

type TDeleteCookies =
  | [key: TValueOf<typeof COOKIES>]
  | [options: Omit<ResponseCookie, 'value' | 'expires'>];

type THasCookies = TValueOf<typeof COOKIES>;

export type { TSetCookies, TGetCookies, TDeleteCookies, THasCookies };
