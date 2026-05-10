import { cache } from 'react';

function CacheReact<This, Return>(
  _target: This,
  _context: ClassFieldDecoratorContext<This, (...args: any[]) => Promise<Return>>
) {
  return function (this: This, value: (...args: any[]) => Promise<Return>) {
    return cache(value);
  };
}

export { CacheReact };
