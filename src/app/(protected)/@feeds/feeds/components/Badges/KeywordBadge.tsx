import type { TKeywordBadgeProps } from './models/badges.model';
import styles from './Badge.module.css';

const KeywordBadges = ({ keywords }: TKeywordBadgeProps) => {
  return (
    <div className={styles.keywords}>
      {keywords.map((kw) => (
        <span key={kw} className={`${styles.badge} ${styles.neutral}`}>
          {kw}
        </span>
      ))}
    </div>
  );
};

export { KeywordBadges };
