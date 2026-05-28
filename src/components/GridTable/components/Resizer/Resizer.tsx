import classNames from 'classnames';
import type { TResizerProps } from './models/resizer.model';
import styles from './Resizer.module.css';

const Resizer = ({ onMouseDown, onTouchStart, isResizing }: TResizerProps) => {
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
