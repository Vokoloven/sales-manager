import { PAGINATION_SKELETON_BUTTON } from './constants/paginationSkeleton.constant';
import styles from './PaginationSkeleton.module.css';

const PaginationSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.text} />
        <div className={styles.select} />
      </div>

      <div className={styles.controls}>
        <div className={styles.prevButtons}>
          {Array.from({ length: PAGINATION_SKELETON_BUTTON.prevButtonCount }).map((_, i) => (
            <div key={i} className={styles.button} />
          ))}
        </div>
        <div className={styles.pageButtons}>
          {Array.from({ length: PAGINATION_SKELETON_BUTTON.pageButtonCount }).map((_, i) => (
            <div key={i} className={styles.button} />
          ))}
        </div>
        <div className={styles.nextButtons}>
          {Array.from({ length: PAGINATION_SKELETON_BUTTON.nextButtonCount }).map((_, i) => (
            <div key={i} className={styles.button} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationSkeleton;
