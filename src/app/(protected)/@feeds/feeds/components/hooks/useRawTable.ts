import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { generateColumns } from '../utils/columns.util';
import type { TFeedsReponseSchema } from '../../models/feeds.schema';

const useRawTable = (data: TFeedsReponseSchema) => {
  const columns = useMemo(() => generateColumns(), []);

  const table = useReactTable({
    columns,
    data: data.data?.items.items ?? [],
    getCoreRowModel: getCoreRowModel()
  });

  return { table } as const;
};

export { useRawTable };
