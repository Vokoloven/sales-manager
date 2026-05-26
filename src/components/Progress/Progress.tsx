import type { TProgressProps } from './models/progress.model';
import styles from './Progress.module.css';

const Progress = ({ value }: TProgressProps) => (
  <progress
    className={`Progress ${styles.progress}${value === undefined ? ` ${styles.progressAnimated}` : ''}`}
    max={100}
    value={value ?? 100}
  />
);

export default Progress;
