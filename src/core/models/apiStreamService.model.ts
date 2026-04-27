type TOptions = RequestInit & { headers?: Record<string, string> };

type THandlers = {
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
};

type TStream = {
  url: string;
  handlers?: THandlers;
  options?: TOptions;
  suppressError?: boolean;
};

type TGetStream = {
  url: string;
  handlers?: THandlers;
  options?: Omit<TOptions, 'body' | 'method'>;
  suppressError?: boolean;
};

type TPostStream = {
  url: string;
  handlers?: THandlers;
  options?: Omit<TOptions, 'method'>;
  suppressError?: boolean;
};

export type { TStream, TGetStream, TPostStream };
