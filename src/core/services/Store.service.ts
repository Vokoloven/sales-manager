import type {
  TStore,
  TStoreInitialValue,
  TStoreKey,
  TStoreValue,
  TStoreValue$
} from '@/core/models/storeService.model';

class StoreService {
  private static store = {} as TStore;

  private static has = (key: TStoreKey) => {
    return StoreService.store[key];
  };

  private static set = (key: TStoreKey, entity: TStoreValue<TStoreKey>) => {
    StoreService.store[key] = entity;
  };

  protected static Inject(
    key: TStoreKey,
    initialValue: TStoreInitialValue<TStoreValue<TStoreKey>>
  ) {
    return function <This, Value extends TStoreValue$<TStoreValue<TStoreKey>>>(
      _value: undefined,
      _context: ClassFieldDecoratorContext<This, Value>
    ) {
      return function (this: This, value$: Value) {
        if (!StoreService.has(key)) {
          StoreService.set(key, { value$, initialValue });
        }

        return StoreService.get(key);
      };
    };
  }

  public static get = (key: TStoreKey) => {
    if (!StoreService.has(key)) {
      throw new Error('Value does not exists in the store service.');
    }

    return StoreService.store[key].value$;
  };

  public static clear = () => {
    Object.values(StoreService.store).forEach(({ value$, initialValue }) => {
      value$.next(initialValue);
    });
  };
}

export { StoreService };
