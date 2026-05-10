const TOKEN = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
} as const;

const TOKENS_INITIAL_STATE = {
  [TOKEN.accessToken]: null,
  [TOKEN.refreshToken]: null
} as const;

export { TOKEN, TOKENS_INITIAL_STATE };
