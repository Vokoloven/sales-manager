import styles from './Badge.module.css';

const KeywordBadge = ({ value }: { value: string }) => (
  <span className={`${styles.badge} ${styles.neutral}`}>{value}</span>
);

const KeywordBadges = ({ keywords }: { keywords?: string[] }) => {
  if (!keywords?.length) return null;
  return (
    <div className={styles.keywords}>
      {keywords.map((kw) => (
        <KeywordBadge key={kw} value={kw} />
      ))}
    </div>
  );
};

export { KeywordBadges };
