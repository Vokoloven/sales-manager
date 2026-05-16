'use client';

import { use } from 'react';
import GridTable from '@/components/GridTable/GridTable';
import { useRawTable } from './hooks/useRawTable';
import type { TFeedsPageProps } from '../models/feeds.model';

const RawTable = ({ promise, parsedSearchParams }: TFeedsPageProps) => {
  const data = use(promise);

  const { table } = useRawTable({ data, parsedSearchParams });

  return <GridTable table={table} />;
};

export default RawTable;
