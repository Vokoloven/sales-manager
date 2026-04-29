const URL = {
  login: '/api/v1/auth/login',
  tokenRefresh: '/api/v1/auth/token/refresh',

  about: '/api/v1/about/version'
} as const;

export { URL };
