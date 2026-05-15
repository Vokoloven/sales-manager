'use client';

import classnames from 'classnames';
import { useProgress } from './hooks/useProgress';
import type { TProgressProps } from './models/progress.model';
import styles from './Progress.module.css';

const Progress = ({ value }: TProgressProps) => {
  const { progress } = useProgress();

  return (
    <progress
      className={classnames('Progress', styles.progress)}
      max={100}
      value={value ?? progress}
    />
  );
};

export default Progress;
