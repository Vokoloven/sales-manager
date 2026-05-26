const API_URL = {
  login: '/api/v1/auth/login',
  refreshToken: '/api/v1/auth/token/refresh',
  recoverUser: '/api/v1/auth/recover-user',
  about: '/api/v1/about/version',
  chats: '/api/v1/chats',
  feeds: '/api/v1/upwork-feeds/get-feeds',
  feed: '/api/v1/upwork-feeds/{{id}}'
} as const;

export { API_URL };
