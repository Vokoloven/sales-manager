import type { TDotsModelProps } from './models/dotsLoader.model';
import styles from './DotsLoader.module.css';

const DotsLoader = ({ label = 'Loading' }: TDotsModelProps) => (
  <div className={styles.root} aria-live='polite' aria-label={label}>
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
  </div>
);

export default DotsLoader;
