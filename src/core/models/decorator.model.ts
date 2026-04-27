type TConstructor = new (...args: unknown[]) => unknown;

type TConstructorParams<Class extends TConstructor> = Class extends new (
  ...args: infer P
) => unknown
  ? P
  : never;

export type { TConstructor, TConstructorParams };
