import { useMemo, useCallback, useState } from 'react';
import InputFilter from '@/components/GridTable/components/FilterCell/components/InputFilter/InputFilter';
import SelectFilter from '@/components/GridTable/components/FilterCell/components/SelectFilter/SelectFilter';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import { debounceFn } from '@/components/GridTable/utils/debounceFn.util';
import DataPicker from './components/DataPicker/DataPicker';
import type { Column, Table, Updater } from '@tanstack/react-table';

const Filter = <C, T>({ column }: { column: Column<C>; table: Table<T> }) => {
  const { setFilterValue, getFilterValue } = column;
  const filterValue = getFilterValue();
  const [inputFilterValue, setInputFilterValue] = useState(filterValue ?? '');

  const debouncedSetFilterValue = useMemo(() => debounceFn(setFilterValue), [setFilterValue]);

  const handleFilterChange = useCallback(
    (updater: Updater<string>) => {
      setInputFilterValue(updater);
      debouncedSetFilterValue(updater);
    },
    [debouncedSetFilterValue]
  );

  const meta = column.columnDef.meta;
  const label = typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id;

  return useMemo(
    () =>
      ({
        [FILTER_TYPE.text]: (
          <InputFilter
            setFilterValue={handleFilterChange}
            filterValue={inputFilterValue}
            label={label}
          />
        ),
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
            label={label}
          />
        )
      })[meta?.filterType ?? FILTER_TYPE.text],
    [
      meta?.filterType,
      filterValue,
      inputFilterValue,
      handleFilterChange,
      label,
      setFilterValue,
      meta?.options
    ]
  );
};

export default Filter;
