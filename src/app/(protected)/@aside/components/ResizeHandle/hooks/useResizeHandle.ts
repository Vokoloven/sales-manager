import { COLLAPSED_ATTR, VAR } from '../constants/resizeHandle.constant';
import { resizeHandleService } from '../services/ResizeHandle.service';
import type { ComponentRef } from 'react';

const useResizeHandle = () => {
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
    if (aside.hasAttribute(COLLAPSED_ATTR)) {
      aside.removeAttribute(COLLAPSED_ATTR);
      resizeHandleService.deleteCookie('aside-collapsed');
    }
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
    aside.style.setProperty(VAR, String(resizeHandleService.clamp(e.clientX)) + 'px');
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    resizeHandleService.setCookie('aside-width', String(resizeHandleService.clamp(e.clientX)));
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const aside = e.currentTarget.closest('aside') as ComponentRef<'aside'>;
    if (aside.hasAttribute(COLLAPSED_ATTR)) {
      aside.removeAttribute(COLLAPSED_ATTR);
      resizeHandleService.deleteCookie('aside-collapsed');
    } else {
      aside.setAttribute(COLLAPSED_ATTR, '');
      resizeHandleService.setCookie('aside-collapsed', '1');
    }
  };

  return { onPointerDown, onPointerMove, onPointerUp, onDoubleClick } as const;
};

export { useResizeHandle };
