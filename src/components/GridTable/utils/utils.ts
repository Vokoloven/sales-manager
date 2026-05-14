/* eslint-disable @typescript-eslint/no-dynamic-delete */
import type { Row, Table } from '@tanstack/react-table';
import type { SetStateAction } from 'react';

const handleSelectAll = <T extends { isDisabled: boolean; children: unknown[] }>(
  table: Table<T>,
  setRowSelection: (value: SetStateAction<object>) => void
): void => {
  const newSelection: Record<string, any> = {};

  const selectRowAndChildren = (row: Row<T>): void => {
    if (row.original.isDisabled) return;

    newSelection[row.id] = true;
    if (row.subRows) {
      row.subRows.forEach(selectRowAndChildren);
    }
  };

  const allSelectableRows = table
    .getRowModel()
    .rows.filter(
      (row: Row<T>) =>
        !row.original.isDisabled && (row.depth === 0 || row.original.children?.length > 0)
    );

  const areAllSelected = allSelectableRows.every((row) => row.getIsSelected());

  if (areAllSelected) {
    setRowSelection({});
  } else {
    allSelectableRows.forEach((row: Row<T>) => {
      selectRowAndChildren(row);
    });
    setRowSelection(newSelection);
  }
};

const findRowById = <T>(rows: Row<T>[], id: string): Row<T> | undefined => {
  for (const row of rows) {
    if (row.id === id) return row;
    if (row.subRows) {
      const found = findRowById(row.subRows, id);
      if (found) return found;
    }
  }
  return undefined;
};

const handleRowSelection = <T extends { isDisabled: boolean }>(
  table: Table<T>,
  row: Row<T>,
  event: React.ChangeEvent<HTMLInputElement>,
  setRowSelection: (value: SetStateAction<object>) => void
): void => {
  const isSelected = event.target.checked;
  const childRows = row.getLeafRows();

  setRowSelection((prevSelection) => {
    const newSelection: Record<string, boolean | string> = { ...prevSelection };

    if (childRows.length > 0) {
      if (isSelected) {
        newSelection[row.id] = true;
      } else {
        delete newSelection[row.id];
      }

      childRows.forEach((childRow) => {
        if (!childRow.original.isDisabled) {
          if (isSelected) {
            newSelection[childRow.id] = true;
          } else {
            delete newSelection[childRow.id];
          }
        }
      });
    } else {
      if (!row.original.isDisabled) {
        if (isSelected) {
          newSelection[row.id] = true;
        } else {
          delete newSelection[row.id];
        }
      }

      if (row.parentId) {
        const { rows } = table.getRowModel();
        const parentRow = findRowById(rows, row.parentId);
        if (parentRow) {
          const siblingRows = parentRow.getLeafRows();

          const allSiblingsSelected = siblingRows.every(
            (siblingRow) => newSelection[siblingRow.id] === true || siblingRow.original.isDisabled
          );
          const noneSiblingsSelected = siblingRows.every(
            (siblingRow) => !newSelection[siblingRow.id] || siblingRow.original.isDisabled
          );

          if (allSiblingsSelected) {
            newSelection[parentRow.id] = true;
          } else if (noneSiblingsSelected) {
            delete newSelection[parentRow.id];
          } else {
            newSelection[parentRow.id] = 'indeterminate';
          }
        }
      }
    }

    return newSelection;
  });
};

export { handleSelectAll, handleRowSelection };
