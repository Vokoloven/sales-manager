import type { TOption } from '@/core/models/option.model';
import type { Updater } from '@tanstack/react-table';
import type { Options } from 'react-select';

type TInputFilter = {
  setFilterValue: (updater: Updater<string>) => void;
  filterValue: unknown;
  label?: string;
};

type TSelectFilter = {
  options: Options<TOption>;
  filterValue: unknown;
  setFilterValue: (updater: Updater<unknown>) => void;
  parsedValue?: string[];
};

export type { TInputFilter, TSelectFilter };
