import classnames from 'classnames';
import { components } from 'react-select';
import Checkbox from '@/components/Checkbox';
import { typedMemo } from '@/core/utils/typedMemo.util';
import type { TCheckboxOption } from './models/checkboxOption.model';
import styles from './CheckboxOption.module.css';

const CheckboxOption = <T,>(props: TCheckboxOption<T>) => {
  const { data, isSelected, innerProps, label, isFocused } = props;

  return (
    <components.Option
      {...props}
      innerProps={{
        ...innerProps,
        className: classnames(styles.option, 'react-select__option', {
          'react-select__checkbox__option-is-focused': isFocused,
          'react-select__checkbox__option-is-selected': isSelected
        })
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
        }}
      />
      <span className={styles.label}>{label || data.label}</span>
    </components.Option>
  );
};

export default typedMemo(CheckboxOption);
