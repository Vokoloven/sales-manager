import { lazy, Suspense } from 'react';
import type { TNullable } from '../models/utility.model';
import type { DehydratedState } from '@tanstack/react-query';
import type { PropsWithChildren, ReactNode } from 'react';

export default function HydrationBoundary({
  children,
  state
}: PropsWithChildren & {
  state?: TNullable<DehydratedState>;
}) {
  let content: ReactNode = null;

  if (process.env.NODE_ENV === 'development') {
    const HydrationBoundary = lazy(() =>
      import('@tanstack/react-query').then((module) => ({
        default: module.HydrationBoundary
      }))
    );

    content = (
      <Suspense fallback={null}>
        <HydrationBoundary state={state}>{children}</HydrationBoundary>
      </Suspense>
    );
  }

  return content;
}
