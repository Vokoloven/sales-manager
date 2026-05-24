import styles from './Badge.module.css';

const getScoreVariant = (score: number) => {
  if (score < 20) return styles.red;
  if (score < 40) return styles.orange;
  if (score < 60) return styles.amber;
  if (score < 80) return styles.lime;
  return styles.green;
};

const ScoreBadge = ({ score }: { score?: number }) => {
  if (score === undefined) return null;
  return <span className={`${styles.badge} ${getScoreVariant(score)}`}>{score}</span>;
};

export { ScoreBadge };
