import { useMemo } from 'react';
import { getScoreVariant } from './utils/scoreBadge.util';
import type { TScoreBadgeProps } from './models/badges.model';
import styles from './Badge.module.css';

const ScoreBadge = ({ score }: TScoreBadgeProps) => {
  const memoGetScoreVarian = useMemo(() => getScoreVariant({ score, styles }), [score]);

  return (
    <span className={`${styles.badge} ${memoGetScoreVarian}`}>
      {!Number.isInteger(score) ? Math.round(score * 10) / 10 : score}
    </span>
  );
};

export { ScoreBadge };
