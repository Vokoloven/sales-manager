import { ScoreBadge } from '../../../components/Badges/ScoreBadge';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';
import type { TMatchedItemProps } from './models/matchedItem.model';
import styles from './MatchedItem.module.css';

const MatchedItem = ({ link, title, content, score, selected, infoBlock }: TMatchedItemProps) => (
  <article className={styles.item}>
    <div className={styles.header}>
      <ScoreBadge score={score} />
      <a
        href={link}
        title={title}
        target='_blank'
        rel='noreferrer noopener'
        className={styles.title}
      >
        {title ?? link}
      </a>
      <span className={styles.checkbox} aria-checked={selected} role='checkbox' />
    </div>

    <MarkdownRenderer content={content} />

    {infoBlock && infoBlock.length > 0 && (
      <dl className={styles.infoBlock}>
        {infoBlock.map(({ key, value }) => (
          <div key={key} className={styles.infoRow}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    )}
  </article>
);

export { MatchedItem };
