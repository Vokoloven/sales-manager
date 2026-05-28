import type { TKey } from './utility.model';
import type { TOKENS_INITIAL_STATE } from '../constants/token.constant';

type TToken = {
  [K in TKey<typeof TOKENS_INITIAL_STATE>]: (typeof TOKENS_INITIAL_STATE)[K] | string;
};

export type { TToken };
