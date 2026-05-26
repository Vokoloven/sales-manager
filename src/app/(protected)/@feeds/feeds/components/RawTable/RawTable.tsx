'use client';

import GridTable from '@/components/GridTable/GridTable';
import { useRawTable } from './hooks/useRawTable';
import type { TFeedsPageProps } from '../../models/feeds.model';

const RawTable = ({ data, parsedSearchParams }: TFeedsPageProps) => {
  const { table } = useRawTable({ data, parsedSearchParams });

  return <GridTable table={table} />;
};

export default RawTable;
