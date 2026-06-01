import { redirect } from 'next/navigation';
import qs from 'qs';
import { Suspense } from 'react';
import Loading from '@/components/Loading/Loading';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { INIT_PAGINATION } from './components/Pagination/constants/pagination.constant';
import RawTableServer from './components/RawTable/RawTableServer';
import { feedsPageSearchParamsSchema } from './schemas/page.schema';
import { decompressFilters } from './utils/compressFilters.util';
import type { TParams } from '@/core/models/params.model';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Feeds | Sales Manager',
  description: 'Dasboard with active sales information'
};

const FeedsPage = async ({ searchParams }: TParams) => {
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

  return (
    <div className={styles.root}>
      <Suspense key={queryStr} fallback={<Loading />}>
        <RawTableServer {...finalParams} />
      </Suspense>
    </div>
  );
};

export default FeedsPage;
