import { Suspense } from 'react';
import Loading from '@/components/Loading/Loading';
import RawTable from './components/RawTable';
import { feedsService } from './service/Feeds.service';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Feeds | Sales Manager',
  description: 'Dasboard with active sales information'
};

const FeedsPage = () => {
  const promise = feedsService.getFeeds();

  return (
    <div className={styles.root}>
      <Suspense fallback={<Loading />}>
        <RawTable promise={promise} />
      </Suspense>
    </div>
  );
};

export default FeedsPage;
