const APP_PUBLIC_PATH = {
  login: '/login'
} as const;

const APP_PROTECTED_PATH = {
  feeds: '/feeds'
} as const;

const APP_PATH = {
  base: '/',
  about: '/about',
  ...APP_PUBLIC_PATH,
  ...APP_PROTECTED_PATH
} as const;

export { APP_PATH, APP_PUBLIC_PATH, APP_PROTECTED_PATH };
