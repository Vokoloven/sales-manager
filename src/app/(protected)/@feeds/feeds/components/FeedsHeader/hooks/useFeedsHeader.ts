import { startTransition, useEffect, useState } from 'react';
import { ASIDE } from '@/app/(protected)/@aside/components/ResizeHandle/constants/resizeHandle.constant';
import { COOKIES } from '@/core/constants/cookies.constant';
import { resizeCookiesAction } from '../actions/feedsHeader.action';
import type { ComponentRef } from 'react';

const useFeedsHeader = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const aside = document.querySelector<ComponentRef<'aside'>>('aside[aria-label="Recent"]');
    if (!aside) return undefined;

    startTransition(() => {
      setIsCollapsed(aside.hasAttribute(ASIDE.dataAside));
    });

    const observer = new MutationObserver(() => {
      setIsCollapsed(aside.hasAttribute(ASIDE.dataAside));
    });

    observer.observe(aside, { attributes: true, attributeFilter: [ASIDE.dataAside] });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const aside = document.querySelector<ComponentRef<'aside'>>('aside[aria-label="Recent"]');
    if (!aside) return;

    if (aside.hasAttribute(ASIDE.dataAside)) {
      aside.removeAttribute(ASIDE.dataAside);
      startTransition(async () => {
        await resizeCookiesAction(COOKIES.asideCollapsed);
      });
    } else {
      aside.setAttribute(ASIDE.dataAside, '');
      startTransition(async () => {
        await resizeCookiesAction(COOKIES.asideCollapsed, 'true');
      });
    }
  };
  return { toggle, isCollapsed } as const;
};

export { useFeedsHeader };
