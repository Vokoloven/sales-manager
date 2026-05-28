import { startTransition, type ComponentRef } from 'react';
import { resizeCookiesAction } from '@/app/(protected)/@feeds/feeds/components/FeedsHeader/actions/feedsHeader.action';
import { COOKIES } from '@/core/constants/cookies.constant';
import { ASIDE } from '../constants/resizeHandle.constant';
import { clamp } from '../utils/resizeHandle.util';

const useResizeHandle = () => {
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
    if (aside.hasAttribute(ASIDE.dataAside)) {
      aside.removeAttribute(ASIDE.dataAside);
      aside.style.setProperty(ASIDE.asideWidthName, String(clamp(e.clientX)) + 'px');
      startTransition(async () => {
        await resizeCookiesAction(COOKIES.asideCollapsed);
      });
    }
    aside.style.transition = 'none';
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
    aside.style.setProperty(ASIDE.asideWidthName, String(clamp(e.clientX)) + 'px');
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
    aside.style.transition = '';
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    startTransition(async () => {
      await resizeCookiesAction(COOKIES.asideWidth, String(clamp(e.clientX)));
    });
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
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

  return { onPointerDown, onPointerMove, onPointerUp, onDoubleClick } as const;
};

export { useResizeHandle };
