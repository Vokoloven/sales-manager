import { redirect } from 'next/navigation';
import qs from 'qs';
import { Suspense } from 'react';
import TableSkeleton from '@/components/GridTable/components/TableSkeleton/TableSkeleton';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import {
  INIT_PAGINATION,
  PAGE_SIZE_OPTION
} from './components/Pagination/constants/pagination.constant';
import Pagination from './components/Pagination/Pagination';
import RawTable from './components/RawTable/RawTable';
import { FeedsTransitionProvider } from './context/FeedsTransition.context';
import { feedsPageSearchParamsSchema } from './schemas/page.schema';
import { feedsService } from './service/Feeds.service';
import { decompressFilters } from './utils/compressFilters.util';
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

  if (!parsedSearchParams.success) {
    redirect(`${APP_PROTECTED_PATH.feeds}?${qs.stringify(INIT_PAGINATION)}`);
  }

  const { sp, ...urlParams } = parsedSearchParams.data;
  const searchParameters = sp ? decompressFilters(sp) : undefined;

  const finalParams = { ...urlParams, searchParameters };

  const data = await feedsService.getFeeds(finalParams);
  const totalPages = data.success ? data.data.items.totalPages : 1;

  return (
    <FeedsTransitionProvider>
      <div className={styles.root}>
        <Suspense fallback={<TableSkeleton showPagination />}>
          <RawTable data={data} parsedSearchParams={finalParams} />
          <Pagination
            options={PAGE_SIZE_OPTION}
            parsedSearchParams={finalParams}
            sp={sp}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    </FeedsTransitionProvider>
  );
};

export default FeedsPage;
