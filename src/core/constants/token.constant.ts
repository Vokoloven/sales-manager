import { COOKIES } from './cookies.constant';

const TOKENS_INITIAL_STATE = {
  [COOKIES.accessToken]: null,
  [COOKIES.refreshToken]: null
} as const;

export { TOKENS_INITIAL_STATE };
