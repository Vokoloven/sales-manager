import { useVirtualizer } from '@tanstack/react-virtual';
import { type ComponentRef, type RefObject, useCallback } from 'react';
import type { TNullable } from '@/core/models/utility.model';

const ITEM_GAP = 6;

const useChatListVirtualizer = <T>(
  items: readonly T[],
  parentRef: RefObject<TNullable<ComponentRef<'div'>>>
) => {
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40 + ITEM_GAP,
    measureElement:
      typeof window !== 'undefined' && !navigator.userAgent.includes('Firefox')
        ? (element): number => Math.round(element.getBoundingClientRect().height)
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

  return { virtualItems, paddingTop, paddingBottom, measureRef };
};

export { useChatListVirtualizer };
