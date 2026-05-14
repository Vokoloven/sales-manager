import classNames from 'classnames';
import type { FC, MouseEventHandler, TouchEventHandler } from 'react';
import styles from './Resizer.module.css';

export type ResizerProps = {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  isResizing: boolean;
};

const Resizer: FC<ResizerProps> = ({ onMouseDown, onTouchStart, isResizing }) => {
  return (
    <div
      className={classNames('resizer', styles.resizer, { isResizing: isResizing })}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div className={classNames('resizerDragHandler', styles['resizer-drag-handler'])}></div>
    </div>
  );
};

export default Resizer;
