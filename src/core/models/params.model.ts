import type { TOptional } from './utility.model';

type TParams<Key extends string | number | symbol = string> = {
  params: Promise<Record<Key, string>>;
  searchParams: Promise<Record<string, TOptional<string | string[]>>>;
};

export type { TParams };
