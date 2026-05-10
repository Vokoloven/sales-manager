const API_URL = {
  login: '/api/v1/auth/login',
  refreshToken: '/api/v1/auth/token/refresh',
  recoverUser: '/api/v1/auth/recover-user',
  about: '/api/v1/about/version'
} as const;

export { API_URL };
