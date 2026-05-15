import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSortAndFilter } from '@/components/GridTable/hooks/useSortAndFilter';
import { generateColumns } from '../utils/columns.util';
import type { TFeedsReponseSchema } from '../../models/feeds.schema';

const useRawTable = (data: TFeedsReponseSchema) => {
  const columns = useMemo(() => generateColumns(), []);
  const { columnFilters, sorting, setColumnFilters, setSorting } = useSortAndFilter();

  const table = useReactTable({
    columns,
    data: data.data?.items.items ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      sorting
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting
  });

  return { table } as const;
};

export { useRawTable };
