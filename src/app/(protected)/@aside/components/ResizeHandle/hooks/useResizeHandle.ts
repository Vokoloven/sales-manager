import { startTransition, type ComponentRef } from 'react';
import { COOKIES } from '@/core/constants/cookies.constant';
import { resizeCookiesAction } from '@/shared/actions/actions/feedsHeader.action';
import { ASIDE } from '@/shared/constants/resizeHandle.constant';
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

  return { onPointerDown, onPointerMove, onPointerUp } as const;
};

export { useResizeHandle };
