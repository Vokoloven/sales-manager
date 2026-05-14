import type { Updater } from '@tanstack/react-table';

type TDatePicker = {
  setFilterValue: (updater: Updater<string>) => void;
  filterValue: string;
};

export type { TDatePicker };
