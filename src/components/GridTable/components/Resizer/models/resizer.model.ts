import type { MouseEventHandler, TouchEventHandler } from 'react';

type TResizerProps = {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  isResizing: boolean;
};

export type { TResizerProps };
