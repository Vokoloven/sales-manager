import type { Column, Table } from '@tanstack/react-table';

const getPinnedOffset = <T>(columnId: string, direction: 'left' | 'right', table: Table<T>) => {
  const pinnedColumns =
    direction === 'left' ? table.getLeftLeafColumns() : [...table.getRightLeafColumns()].reverse();

  const index = pinnedColumns.findIndex((col) => col.id === columnId);

  if (index === -1) return 0;
  const precedingColumns = pinnedColumns.slice(0, index);

  return precedingColumns.reduce((offset, col) => {
    const colSize = col.getSize() ?? 0;
    return offset + colSize;
  }, 0);
};

const getExtremePinnedColumn = <T>(pinned: 'left' | 'right', table: Table<T>) => {
  const visibleColumns = table.getVisibleLeafColumns();
  const pinnedColumns = visibleColumns.filter((col) => col.getIsPinned() === pinned);

  return pinned === 'left' ? pinnedColumns.at(-1) : pinnedColumns[0];
};

const pinnedColumnMeta = <T>(column: Column<T>, table: Table<T>) => {
  const pinnedDirection = column.getIsPinned();
  const pinnedOffset = pinnedDirection ? getPinnedOffset(column.id, pinnedDirection, table) : 0;

  const lastPinnedColumn = pinnedDirection
    ? getExtremePinnedColumn(pinnedDirection, table)
    : undefined;

  const isLeftPinned = pinnedDirection === 'left' && column.id === lastPinnedColumn?.id;

  const isRightPinned = pinnedDirection === 'right' && column.id === lastPinnedColumn?.id;

  return {
    pinnedDirection,
    pinnedOffset,
    isLeftPinned,
    isRightPinned
  };
};
export { pinnedColumnMeta };
