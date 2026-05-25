import { notFound } from 'next/navigation';
import { KeywordBadges } from '../components/Badges/KeywordBadge';
import { ScoreBadge } from '../components/Badges/ScoreBadge';
import { MarkdownRenderer } from './components/MarkdownRenderer/MarkdownRenderer';
import { MatchedItem } from './components/MatchedItem/MatchedItem';
import ReturnButton from './components/ReturnButton/ReturnButton';
import { feedService } from './services/Feed.service';
import { toMetaDescription } from './utils/toMetaDescription';
import type { TParams } from '@/core/models/params.model';
import styles from './page.module.css';

const generateMetadata = async ({ params }: TParams<'id'>) => {
  const { id } = await params;

  const data = await feedService.getFeed(id);

  return {
    title: data.data?.title,
    description: toMetaDescription(data.data?.description)
  };
};

const ViewFeed = async ({ params }: TParams<'id'>) => {
  const { id } = await params;

  const data = await feedService.getFeed(id);

  if (!data.data) notFound();

  return (
    <div className={styles.root}>
      <header>
        <nav>
          <ReturnButton />
        </nav>
        <h1>{data.data.title}</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Project info</h2>
          <div className={styles.meta}>
            <ScoreBadge score={data.data.score} />
            <a href={data.data.url} target='_blank' rel='noreferrer noopener'>
              {data.data.title}
            </a>
            <span className={styles.date}>
              {new Date(data.data.published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <MarkdownRenderer content={data.data.description ?? ''} />
        </section>

        <section className={styles.section}>
          <h2>Keywords</h2>
          <KeywordBadges keywords={data.data.keywords} />
        </section>

        {data.data.matchedCasesData.length > 0 && (
          <section className={styles.section}>
            <h2>Matched cases</h2>
            {data.data.matchedCasesData.map(
              ({ docId, link, title, content, score, selected, infoBlock }) => (
                <MatchedItem
                  key={docId}
                  link={link}
                  title={title}
                  content={content}
                  score={score}
                  selected={selected}
                  infoBlock={infoBlock}
                />
              )
            )}
          </section>
        )}

        {data.data.matchedBlogsData.length > 0 && (
          <section className={styles.section}>
            <h2>Matched blogs</h2>
            {data.data.matchedBlogsData.map(
              ({ docId, link, title, content, score, selected, infoBlock }) => (
                <MatchedItem
                  key={docId}
                  link={link}
                  title={title}
                  content={content}
                  score={score}
                  selected={selected}
                  infoBlock={infoBlock}
                />
              )
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export { generateMetadata };

export default ViewFeed;
