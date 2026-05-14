import { type RefObject, useEffect, useState } from 'react';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';

const useScrollPinnedBoundaries = (containerRef: RefObject<TNullable<ComponentRef<'div'>>>) => {
  const [hasContentBehindOfPinned, setHasContentBehindOfPinned] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const updateBoundaries = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const hasHiddenContent = scrollLeft + clientWidth < scrollWidth;

      setHasContentBehindOfPinned(hasHiddenContent);
    };

    container.addEventListener('scroll', updateBoundaries);
    const resizeObserver = new ResizeObserver(updateBoundaries);

    resizeObserver.observe(container);
    updateBoundaries();

    return () => {
      container.removeEventListener('scroll', updateBoundaries);
      resizeObserver.disconnect();
    };
  }, []);

  return { hasContentBehindOfPinned };
};

export { useScrollPinnedBoundaries };
