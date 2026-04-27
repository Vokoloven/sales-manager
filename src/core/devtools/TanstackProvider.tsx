'use client';

import { lazy, Suspense } from 'react';
import { tanstackQueryService } from '@/core/services/TanstackQuery.service';
import type { PropsWithChildren } from 'react';

export default function TanstackProvider({ children }: PropsWithChildren) {
  let content = children;

  if (process.env.NODE_ENV === 'development') {
    const QueryClientProvider = lazy(() =>
      import('@tanstack/react-query').then((module) => ({
        default: module.QueryClientProvider
      }))
    );

    const ReactQueryDevtools = lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools
      }))
    );

    content = (
      <Suspense fallback={null}>
        <QueryClientProvider client={tanstackQueryService.queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Suspense>
    );
  }

  return content;
}
