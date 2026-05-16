import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { generateColumns } from '../utils/columns.util';
import type { TUseRawTable } from './models/useRawTable.model';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

const useRawTable = ({ data, parsedSearchParams }: TUseRawTable) => {
  const { searchParameters = [], sortBy, sortDirection, pageSize, pageNumber } = parsedSearchParams;

  const router = useRouter();
  const isFirstRender = useRef(true);

  const columns = useMemo(() => generateColumns(), []);

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (!sortBy) return [];
    return [{ id: sortBy, desc: sortDirection === 'desc' }];
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    searchParameters.map(({ searchBy, searchQuery }) => ({
      id: searchBy,
      value: searchQuery
    }))
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const filters = columnFilters
      .filter(({ value }) => Boolean(value))
      .map(({ id, value }) => ({ searchBy: id, searchQuery: value as string }));

    const newSortBy = sorting[0]?.id;
    const newSortDirection = sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined;

    router.push(
      `${APP_PROTECTED_PATH.feeds}?${qs.stringify(
        {
          pageSize,
          pageNumber,
          sortBy: newSortBy,
          sortDirection: newSortDirection,
          searchParameters: filters
        },
        { arrayFormat: 'indices', skipNulls: true }
      )}`
    );
  }, [columnFilters, sorting, router, pageSize, pageNumber]);

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
