/* eslint-disable @typescript-eslint/consistent-type-definitions */
import '@tanstack/react-table';
import type { FILTER_TYPE } from '../components/FilterCell/constnts/filterCell.constant';
import type { TOption } from '@/core/models/option.model';
import type { TValueOf } from '@/core/models/utility.model';
import type { Options } from 'react-select';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    [key: string]: unknown;
    filterType?: TValueOf<typeof FILTER_TYPE>;
    options?: Options<TOption>;
  }

  interface TableMeta<TData extends RowData> {
    isPending?: boolean;
    onRowClick?: (
      rowData: TData,
      virtualIndex: number,
      e: React.MouseEvent<HTMLTableRowElement>
    ) => void;
  }
}

export {};
