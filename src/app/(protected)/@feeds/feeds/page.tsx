import { redirect } from 'next/navigation';
import qs from 'qs';
import { Suspense } from 'react';
import TableSkeleton from '@/components/GridTable/components/TableSkeleton/TableSkeleton';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import RawTable from './components/RawTable';
import { feedsPageSearchParamsSchema } from './schemas/page.schema';
import { feedsService } from './service/Feeds.service';
import type { TPageProps } from './models/page.model';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Feeds | Sales Manager',
  description: 'Dasboard with active sales information'
};

const FeedsPage = async ({ searchParams }: TPageProps) => {
  const rawSearchParams = await searchParams;

  const queryStr = new URLSearchParams(
    Object.entries(rawSearchParams)
      .filter(([, v]) => v !== undefined)
      .flatMap(([k, v]) => (Array.isArray(v) ? v.map((val) => [k, val]) : [[k, v as string]]))
  ).toString();

  const parsedSearchParams = feedsPageSearchParamsSchema.safeParse(qs.parse(queryStr));

  if (
    !parsedSearchParams.success ||
    !parsedSearchParams.data.pageSize ||
    !parsedSearchParams.data.pageNumber
  ) {
    redirect(`${APP_PROTECTED_PATH.feeds}?${qs.stringify({ pageSize: 10, pageNumber: 1 })}`);
  }

  const promise = feedsService.getFeeds(parsedSearchParams.data);

  return (
    <div className={styles.root}>
      <Suspense fallback={<TableSkeleton />}>
        <RawTable promise={promise} parsedSearchParams={parsedSearchParams.data} />
      </Suspense>
    </div>
  );
};

export default FeedsPage;
