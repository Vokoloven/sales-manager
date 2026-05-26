'use client';

import { createContext, useTransition } from 'react';
import type { TFeedsTransitionContext } from './models/feedsTransition.model';
import type { ReactNode } from 'react';

const FeedsTransitionContext = createContext<TFeedsTransitionContext>({
  isPending: false,
  startTransition: (fn) => {
    void fn();
  }
});

const FeedsTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <FeedsTransitionContext value={{ isPending, startTransition }}>
      {children}
    </FeedsTransitionContext>
  );
};

export { FeedsTransitionProvider, FeedsTransitionContext };
