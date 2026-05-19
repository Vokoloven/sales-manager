import { Children, type ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { TNullable } from '@/core/models/utility.model';

const useValueContainer = (children: ReactNode) => {
  const containerRef = useRef<TNullable<HTMLDivElement>>(null);
  const badgeRef = useRef<TNullable<HTMLDivElement>>(null);

  const [hiddenCount, setHiddenCount] = useState(0);
  const [hiddenTooltip, setHiddenTooltip] = useState('');

  const childArray = Children.toArray(children);

  const input = childArray[childArray.length - 1];
  const chips = childArray.slice(0, -1);

  const calculateVisibleChips = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const chipEls = Array.from(container.querySelectorAll<HTMLElement>('[data-chip]'));

    if (chipEls.length === 0) {
      setHiddenCount(0);
      setHiddenTooltip('');
      return;
    }

    for (const el of chipEls) {
      el.style.display = 'flex';
    }

    const badgeWidth = badgeRef.current?.offsetWidth ?? 0;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.gap) || 0;
    const available = container.offsetWidth;

    let used = 0;
    let hidden = 0;
    let tooltipText = '';

    for (let i = 0; i < chipEls.length; i++) {
      const el = chipEls[i];
      if (el) {
        const width = el.offsetWidth + (i > 0 ? gap : 0);
        const hasMore = i < chipEls.length - 1;
        const budget = used + width + (hasMore ? badgeWidth + gap : 0);

        if (budget <= available) {
          used += width;
        } else {
          hidden = chipEls.length - i;
          const hiddenTexts: string[] = [];

          for (let j = i; j < chipEls.length; j++) {
            const subEl = chipEls[j];
            if (subEl) {
              subEl.style.display = 'none';
              hiddenTexts.push(subEl.textContent?.trim() || '');
            }
          }
          tooltipText = hiddenTexts.join('\n');
          break;
        }
      }
    }

    setHiddenCount((prev) => (prev !== hidden ? hidden : prev));
    setHiddenTooltip((prev) => (prev !== tooltipText ? tooltipText : prev));
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    calculateVisibleChips();

    const observer = new ResizeObserver(() => {
      calculateVisibleChips();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [children, calculateVisibleChips]);

  return {
    containerRef,
    badgeRef,
    hiddenCount,
    chips,
    input,
    hiddenTooltip
  } as const;
};

export { useValueContainer };
