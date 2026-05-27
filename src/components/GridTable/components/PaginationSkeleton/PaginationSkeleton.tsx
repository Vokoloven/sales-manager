import styles from './PaginationSkeleton.module.css';

const PREV_BUTTON_COUNT = 2;
const PAGE_BUTTON_COUNT = 6;
const NEXT_BUTTON_COUNT = 2;

const PaginationSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.text} />
        <div className={styles.select} />
      </div>

      <div className={styles.controls}>
        <div className={styles.prevButtons}>
          {Array.from({ length: PREV_BUTTON_COUNT }).map((_, i) => (
            <div key={i} className={styles.button} />
          ))}
        </div>
        <div className={styles.pageButtons}>
          {Array.from({ length: PAGE_BUTTON_COUNT }).map((_, i) => (
            <div key={i} className={styles.button} />
          ))}
        </div>
        <div className={styles.nextButtons}>
          {Array.from({ length: NEXT_BUTTON_COUNT }).map((_, i) => (
            <div key={i} className={styles.button} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationSkeleton;
