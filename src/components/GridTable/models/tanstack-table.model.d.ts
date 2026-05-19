import '@tanstack/react-table';
import type { FILTER_TYPE } from '../components/FilterCell/constnts/filterCell.constant';
import type { TValueOf } from '@/core/models/utility.model';
import { Options } from 'react-select';
import { TOption } from '@/core/models/option.model';

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
