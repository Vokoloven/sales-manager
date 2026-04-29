const URL = {
  login: '/api/v1/auth/login',
  tokenRefresh: '/api/v1/auth/token/refresh',
  recoverUser: '/api/v1/auth/recover-user',

  about: '/api/v1/about/version'
} as const;

export { URL };
