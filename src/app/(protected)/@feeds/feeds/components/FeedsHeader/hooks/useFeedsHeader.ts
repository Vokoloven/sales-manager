import { startTransition, useEffect, useState } from 'react';
import { ASIDE } from '@/app/(protected)/@aside/components/ResizeHandle/constants/resizeHandle.constant';
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
      document.cookie = `aside-collapsed=;path=/;max-age=0;samesite=strict`;
    } else {
      aside.setAttribute(ASIDE.dataAside, '');
      document.cookie = `aside-collapsed=1;path=/;max-age=${ASIDE.cookieMaxAge};samesite=strict`;
    }
  };
  return { toggle, isCollapsed } as const;
};

export { useFeedsHeader };
