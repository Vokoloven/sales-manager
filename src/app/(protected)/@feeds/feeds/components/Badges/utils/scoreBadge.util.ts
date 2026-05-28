import type { TGetScoreVariant } from '../models/badges.model';

const getScoreVariant = ({ score, styles }: TGetScoreVariant) => {
  if (score < 20) return styles.red;
  if (score < 40) return styles.orange;
  if (score < 60) return styles.amber;
  if (score < 80) return styles.lime;
  return styles.green;
};

export { getScoreVariant };
