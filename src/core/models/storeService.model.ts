import type { TKey, TZodInfer } from './utility.model';
import type { storeSchema } from '@/core/schemas/storeService.schema';

type TStore = TZodInfer<typeof storeSchema>;

type TStoreKey = TKey<TStore>;

type TStoreValue<Key extends TStoreKey> = TStore[Key];

type TStoreValue$<Value$ extends TStoreValue<TStoreKey>> = Value$ extends { value$: infer P }
  ? P
  : never;

type TStoreInitialValue<Value$ extends TStoreValue<TStoreKey>> = Value$ extends {
  initialValue: infer P;
}
  ? P
  : never;

export type { TStore, TStoreKey, TStoreValue, TStoreValue$, TStoreInitialValue };
