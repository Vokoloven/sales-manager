import type { TransitionStartFunction } from 'react';

type TFeedsTransitionContext = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

export type { TFeedsTransitionContext };
