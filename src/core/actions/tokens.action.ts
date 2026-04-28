'use server';

import { cookies } from 'next/headers';
import { TOKENS } from '../constants/tokens.constant';
import type { TToken } from '../models/tokenService.model';

const getTokens = async () => {
  const accessToken = (await cookies()).get(TOKENS.accessToken)?.value ?? null;
  const refreshToken = (await cookies()).get(TOKENS.refreshToken)?.value ?? null;

  return { accessToken, refreshToken };
};

const setTokens = async ({ accessToken, refreshToken }: TToken) => {
  if (accessToken) {
    (await cookies()).set(TOKENS.accessToken, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24
    });
  } else {
    (await cookies()).delete(TOKENS.accessToken);
  }

  if (refreshToken) {
    (await cookies()).set(TOKENS.refreshToken, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });
  } else {
    (await cookies()).delete(TOKENS.refreshToken);
  }
};

export { getTokens, setTokens };
