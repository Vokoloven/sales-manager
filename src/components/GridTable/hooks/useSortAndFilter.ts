import { useState } from 'react';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

const useSortAndFilter = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return { columnFilters, setColumnFilters, sorting, setSorting } as const;
};

export { useSortAndFilter };
