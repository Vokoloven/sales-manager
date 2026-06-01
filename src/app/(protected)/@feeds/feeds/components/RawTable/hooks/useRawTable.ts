import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useMemo, useState } from 'react';
import { generateColumns } from '@/app/(protected)/@feeds/feeds/components/RawTable/utils/columns.util';
import { compressFilters } from '@/app/(protected)/@feeds/feeds/utils/compressFilters.util';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { INIT_PAGINATION } from '../../Pagination/constants/pagination.constant';
import type { TSearchFilter } from '@/app/(protected)/@feeds/feeds/models/compressFilters.model';
import type { TFeedsPageProps } from '@/app/(protected)/@feeds/feeds/models/feeds.model';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

const useRawTable = ({ data, parsedSearchParams }: TFeedsPageProps) => {
  const { searchParameters = [], sortBy, sortDirection, pageSize } = parsedSearchParams;

  const router = useRouter();

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

  const navigateWithState = (filters: ColumnFiltersState, sort: SortingState) => {
    const filterParams = filters
      .filter(({ value }) => (Array.isArray(value) ? value.length > 0 : Boolean(value)))
      .flatMap(({ id, value }) =>
        Array.isArray(value)
          ? (value as string[]).map((v) => ({
              searchBy: id as TSearchFilter['searchBy'],
              searchQuery: v
            }))
          : [{ searchBy: id as TSearchFilter['searchBy'], searchQuery: value as string }]
      );

    const newSortBy = sort[0]?.id;
    const newSortDirection = sort[0] ? (sort[0].desc ? 'desc' : 'asc') : undefined;

    router.push(
      `${APP_PROTECTED_PATH.feeds}?${qs.stringify(
        {
          ...INIT_PAGINATION,
          pageSize,
          sortBy: newSortBy,
          sortDirection: newSortDirection,
          sp: compressFilters(filterParams)
        },
        { skipNulls: true }
      )}`
    );
  };

  const table = useReactTable({
    columns: memoColumns,
    data: memoData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      sorting
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);
      navigateWithState(newFilters, sorting);
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      navigateWithState(columnFilters, newSorting);
    },
    meta: {
      onRowClick: (rowData) => {
        router.push(`${APP_PROTECTED_PATH.feeds}/${rowData.id}`);
      }
    }
  });

  return { table } as const;
};

export { useRawTable };
