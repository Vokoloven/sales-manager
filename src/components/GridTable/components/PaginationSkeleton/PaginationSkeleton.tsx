import styles from './PaginationSkeleton.module.css';

const BUTTON_COUNT = 10;

const PaginationSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.text} />
        <div className={styles.select} />
      </div>
      <div className={styles.right}>
        {Array.from({ length: BUTTON_COUNT }).map((_, i) => (
          <div key={i} className={styles.button} />
        ))}
      </div>
    </div>
  );
};

export default PaginationSkeleton;
