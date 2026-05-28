import { useMemo, useCallback, useState } from 'react';
import { debounceFn } from '@/components/GridTable/utils/debounceFn.util';
import DataPicker from '../components/DatePicker/DatePicker';
import InputFilter from '../components/InputFilter/InputFilter';
import SelectFilter from '../components/SelectFilter/SelectFilter';
import { FILTER_TYPE } from '../constnts/filterCell.constant';
import type { TFilterCellProps } from '../models/filterCell.model';
import type { Updater } from '@tanstack/react-table';

const useFilterCell = <C, T>({ column }: TFilterCellProps<C, T>) => {
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

  const filter = useMemo(
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
            parsedValue={meta?.parsedValue}
            label={label}
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
      inputFilterValue,
      label,
      filterValue,
      handleFilterChange,
      setFilterValue,
      meta?.options,
      meta?.parsedValue,
      meta?.filterType
    ]
  );

  return { filter };
};

export { useFilterCell };
