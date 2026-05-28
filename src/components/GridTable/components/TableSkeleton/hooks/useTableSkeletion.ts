import { useSyncExternalStore } from 'react';
import { TABLE_SKELETON } from '../constants/tableSkeleton.constant';
import { subscribe } from '../utils/tableSkeleton.util';
import type { TTableSkeletonProps } from '../models/TableSkeleton.model';

const useTableSkeleton = ({ columns = 4, rows }: Omit<TTableSkeletonProps, 'showPagination'>) => {
  const viewportRows = useSyncExternalStore(
    subscribe,
    () => Math.ceil(window.innerHeight / TABLE_SKELETON.rowHeight),
    () => 10
  );

  const rowCount = rows ?? viewportRows;
  const colCount = Math.min(columns, TABLE_SKELETON.headerWidth.length);

  return { colCount, rowCount } as const;
};

export { useTableSkeleton };
