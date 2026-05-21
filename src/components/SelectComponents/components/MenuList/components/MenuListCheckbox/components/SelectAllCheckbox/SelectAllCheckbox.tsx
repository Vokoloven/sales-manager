import classnames from 'classnames';
import { useCallback } from 'react';
import Checkbox from '@/components/Checkbox';
import { typedMemo } from '@/core/utils/typedMemo.util';
import type { TSelectAllCheckbox } from './models/selectAllCheckbox.model';
import styles from './SelectAllCheckbox.module.css';

const SelectAllCheckbox = <T,>({ selectProps, getValue, allOptions }: TSelectAllCheckbox<T>) => {
  const totalOptionsCount = allOptions.length;
  const currentValue = getValue();
  const isAllSelected = totalOptionsCount > 0 && currentValue.length === totalOptionsCount;
  const isIndeterminate = currentValue.length > 0 && currentValue.length < totalOptionsCount;

  const handleSelectAllToggle = useCallback(() => {
    if (isAllSelected) {
      const removedValues = getValue();

      selectProps.onChange([], {
        action: 'clear',
        removedValues
      });
    } else {
      selectProps.onChange(allOptions, {
        action: 'select-option',
        option: allOptions[0]
      });
    }
  }, [isAllSelected]);

  return (
    <div
      className={classnames(styles.selectAllCheckbox, 'react-select_all_option')}
      data-selected={isAllSelected}
      onClick={handleSelectAllToggle}
    >
      <Checkbox
        checked={isAllSelected}
        indeterminate={isIndeterminate}
        onChange={(e) => {
          e.stopPropagation();
        }}
      />
      <span>All</span>
    </div>
  );
};

export default typedMemo(SelectAllCheckbox);
