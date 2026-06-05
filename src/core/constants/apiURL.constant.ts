const API_URL = {
  login: '/api/v1/auth/login',
  refreshToken: '/api/v1/auth/token/refresh',
  recoverUser: '/api/v1/auth/recover-user',
  about: '/api/v1/about/version',
  chats: '/api/v1/chats',
  chatsPaginated: '/api/v1/chats/get-chats',
  chat: '/api/v1/chats/{{id}}',
  feeds: '/api/v1/upwork-feeds/get-feeds',
  feed: '/api/v1/upwork-feeds/{{id}}',
  messagesPaginated: '/api/v1/messages/get-messages/{{chatId}}',
  sendMessage: '/api/v1/messages/send-message',
  subMessages: '/api/v1/messages/subscribe',
  unSubMessages: '/api/v1/messages/unsubscribe'
} as const;

export { API_URL };
