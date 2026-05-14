'use client';

import { use } from 'react';
import GridTable from '@/components/GridTable/GridTable';
import { useRawTable } from './hooks/useRawTable';
import type { TFeedsReponseSchema } from '../models/feeds.schema';

const RawTable = ({ promise }: { promise: Promise<TFeedsReponseSchema> }) => {
  const result = use(promise);
  const { table } = useRawTable(result);

  return <GridTable table={table} />;
};

export default RawTable;
