import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import type { TNullable } from '@/core/models/utility.model';
import type { Table } from '@tanstack/react-table';
import type { ComponentRef } from 'react';

const useGridTable = <T>(table: Table<T>) => {
  const tableState = table.getState();

  const isFiltered = (tableState.globalFilter ??
    Object.keys(tableState.columnFilters).length > 0) as boolean;

  const isPending = table.options.meta?.isPending ?? false;

  const tableContainerRef = useRef<TNullable<ComponentRef<'div'>>>(null);

  const { rows } = table.getRowModel();

  const onRowClick = table.options.meta?.onRowClick;

  useEffect(() => {
    if (isPending) {
      tableContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isPending]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 36,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && !navigator.userAgent.includes('Firefox')
        ? (element): number => Math.round(element.getBoundingClientRect().height)
        : undefined,
    overscan: 5
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0]?.start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0)
      : 0;

  return {
    rowVirtualizer,
    tableContainerRef,
    isFiltered,
    isPending,
    rows,
    virtualItems,
    paddingTop,
    paddingBottom,
    onRowClick
  } as const;
};

export { useGridTable };
