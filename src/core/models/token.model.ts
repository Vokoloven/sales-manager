import type { TKey, TNullable } from './utility.model';
import type { TOKEN } from '../constants/token.constant';

type TToken = Record<TKey<typeof TOKEN>, TNullable<string>>;

export type { TToken };
