'use client';

import { useResizeHandle } from './hooks/useResizeHandle';
import styles from './ResizeHandle.module.css';

const ResizeHandle = () => {
  const { onDoubleClick, onPointerDown, onPointerMove, onPointerUp } = useResizeHandle();

  return (
    <div
      className={styles.handle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onDoubleClick}
      aria-hidden='true'
    />
  );
};

export default ResizeHandle;
