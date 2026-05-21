import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback
} from 'react';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';

const useSelectVirtualizer = (
  children: ReactNode,
  parentRef: RefObject<TNullable<ComponentRef<'div'>>>
) => {
  const rows = Children.toArray(children).filter(
    (child): child is ReactElement<Record<string, unknown>> =>
      isValidElement<Record<string, unknown>>(child) && 'data' in child.props
  );

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    measureElement:
      typeof window !== 'undefined' && !navigator.userAgent.includes('Firefox')
        ? (element): number => Math.round(element?.getBoundingClientRect().height)
        : undefined,
    overscan: 5
  });

  const measureRef = useCallback(
    (el: TNullable<HTMLDivElement>) => {
      if (el) virtualizer.measureElement(el);
    },
    [virtualizer]
  );

  const virtualItems = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(0, (virtualItems[0]?.start ?? 0) - virtualizer.options.scrollMargin),
          Math.max(
            0,
            virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0)
          )
        ]
      : [0, 0];

  const height = virtualizer.getTotalSize() ? `${String(virtualizer.getTotalSize())}px` : 'auto';

  const [lastItem] = [...virtualItems].reverse();

  const isLastItem = lastItem ? lastItem.index >= rows.length - 1 : false;

  return { height, virtualItems, paddingTop, paddingBottom, rows, isLastItem, measureRef };
};

export { useSelectVirtualizer };
