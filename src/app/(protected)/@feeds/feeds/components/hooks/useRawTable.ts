import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { compressFilters, type TSearchFilter } from '../../utils/compressFilters.util';
import { INIT_PAGINATION } from '../Pagination/constants/pagination.constant';
import { generateColumns } from '../utils/columns.util';
import type { TFeedsPageProps } from '../../models/feeds.model';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

const useRawTable = ({ data, parsedSearchParams }: TFeedsPageProps) => {
  const { searchParameters = [], sortBy, sortDirection } = parsedSearchParams;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  const scoreParsedValue = useMemo(
    () =>
      searchParameters
        .filter(({ searchBy }) => searchBy === 'score')
        .map(({ searchQuery }) => searchQuery),
    [searchParameters]
  );

  const keywordsParsedValue = useMemo(
    () =>
      searchParameters
        .filter(({ searchBy }) => searchBy === 'keywords')
        .map(({ searchQuery }) => searchQuery),
    [searchParameters]
  );

  const memoColumns = useMemo(
    () => generateColumns({ data, scoreParsedValue, keywordsParsedValue }),
    [data, scoreParsedValue, keywordsParsedValue]
  );

  const memoData = useMemo(() => data.data?.items.items ?? [], [data]);

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

  useEffect(
    function handleSortAndFilters() {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const filters = columnFilters
        .filter(({ value }) => (Array.isArray(value) ? value.length > 0 : Boolean(value)))
        .flatMap(({ id, value }) =>
          Array.isArray(value)
            ? (value as string[]).map((v) => ({
                searchBy: id as TSearchFilter['searchBy'],
                searchQuery: v
              }))
            : [{ searchBy: id as TSearchFilter['searchBy'], searchQuery: value as string }]
        );

      const newSortBy = sorting[0]?.id;
      const newSortDirection = sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined;

      startTransition(() => {
        router.push(
          `${APP_PROTECTED_PATH.feeds}?${qs.stringify(
            {
              ...INIT_PAGINATION,
              sortBy: newSortBy,
              sortDirection: newSortDirection,
              sp: compressFilters(filters)
            },
            { skipNulls: true }
          )}`
        );
      });
    },
    [columnFilters, sorting, router]
  );

  const table = useReactTable({
    columns: memoColumns,
    data: memoData,
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
