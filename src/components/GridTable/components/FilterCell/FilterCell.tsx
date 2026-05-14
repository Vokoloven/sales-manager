import { useMemo, useCallback } from 'react';
import InputFilter from '@/components/GridTable/components/FilterCell/components/InputFilter/InputFilter';
import SelectFilter from '@/components/GridTable/components/FilterCell/components/SelectFilter/SelectFilter';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import { debounceFn } from '@/components/GridTable/utils/debounceFn.util';
import DataPicker from './components/DataPicker/DataPicker';
import type { Column, Table } from '@tanstack/react-table';

const Filter = <C, T>({ column }: { column: Column<C>; table: Table<T> }) => {
  const { setFilterValue, getFilterValue } = column;
  const filterValue = getFilterValue();

  const debounceSetFilterValue = useCallback(debounceFn(setFilterValue), []);

  const meta = column.columnDef.meta;

  return useMemo(
    () =>
      ({
        [FILTER_TYPE.text]: <InputFilter setFilterValue={debounceSetFilterValue} />,
        [FILTER_TYPE.select]: (
          <SelectFilter
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            options={meta?.options ?? []}
          />
        ),
        [FILTER_TYPE.date]: (
          <DataPicker
            setFilterValue={setFilterValue}
            filterValue={typeof filterValue === 'string' ? filterValue : ''}
          />
        )
      })[meta?.filterType ?? FILTER_TYPE.text],
    [meta?.filterType, filterValue]
  );
};

export default Filter;
