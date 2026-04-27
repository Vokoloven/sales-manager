import type { TConstructor, TConstructorParams } from '@/core/models/decorator.model';

const instances = new Map<TConstructor, unknown>();

function Singleton<Class extends TConstructor>(
  value: Class,
  _context: ClassDecoratorContext<Class>
) {
  return function (...args: TConstructorParams<Class>) {
    if (!instances.has(value)) {
      instances.set(value, new value(...args));
    }

    return instances.get(value);
  } as unknown as Class;
}

export { Singleton };
