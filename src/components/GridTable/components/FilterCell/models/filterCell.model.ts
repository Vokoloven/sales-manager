import type { TOption } from '@/core/models/option.model';
import type { Column, Table, Updater } from '@tanstack/react-table';
import type { Options } from 'react-select';

type TFilterCellProps<C, T> = { column: Column<C>; table: Table<T> };

type TInputFilter = {
  setFilterValue: (updater: Updater<string>) => void;
  filterValue: unknown;
  label?: string;
};

type TSelectFilter = {
  filterValue: unknown;
  setFilterValue: (updater: Updater<unknown>) => void;
  options?: Options<TOption>;
  parsedValue?: string[];
  label?: string;
};

export type { TInputFilter, TSelectFilter, TFilterCellProps };
