import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { generateColumns } from '../utils/columns.util';
import type { TUseRawTable } from './models/useRawTable.model';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

const useRawTable = ({ data, parsedSearchParams }: TUseRawTable) => {
  const { searchParameters = [], sortBy, sortDirection, pageSize, pageNumber } = parsedSearchParams;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  const columns = useMemo(
    () => generateColumns({ data, parsedSearchParams }),
    [data, parsedSearchParams]
  );

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (!sortBy) return [];
    return [{ id: sortBy, desc: sortDirection === 'desc' }];
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const grouped = searchParameters.reduce<Record<string, string[]>>(
      (acc, { searchBy, searchQuery }) => {
        (acc[searchBy] ??= []).push(searchQuery);
        return acc;
      },
      {}
    );
    return Object.entries(grouped).map(([id, values]) => ({
      id,
      value: values.length === 1 ? values[0] : values
    }));
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const filters = columnFilters
      .filter(({ value }) => (Array.isArray(value) ? value.length > 0 : Boolean(value)))
      .flatMap(({ id, value }) =>
        Array.isArray(value)
          ? (value as string[]).map((v) => ({ searchBy: id, searchQuery: v }))
          : [{ searchBy: id, searchQuery: value as string }]
      );

    const newSortBy = sorting[0]?.id;
    const newSortDirection = sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined;

    startTransition(() => {
      router.push(
        `${APP_PROTECTED_PATH.feeds}?${qs.stringify(
          {
            pageSize: 50,
            pageNumber: 1,
            sortBy: newSortBy,
            sortDirection: newSortDirection,
            searchParameters: filters
          },
          { arrayFormat: 'indices', skipNulls: true }
        )}`
      );
    });
  }, [columnFilters, sorting, router, pageSize, pageNumber]);

  const table = useReactTable({
    columns,
    data: data.success ? data.data.items.items : [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      sorting
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    meta: {
      isPending
    }
  });

  return { table } as const;
};

export { useRawTable };
