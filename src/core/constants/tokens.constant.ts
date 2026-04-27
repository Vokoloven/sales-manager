const TOKENS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
} as const;

const TOKENS_INITIAL_STATE = {
  [TOKENS.accessToken]: null,
  [TOKENS.refreshToken]: null
} as const;

export { TOKENS, TOKENS_INITIAL_STATE };
