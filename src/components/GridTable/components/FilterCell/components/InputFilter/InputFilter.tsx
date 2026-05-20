import classNames from 'classnames';
import Input from '@/components/Input/Input';
import type { TInputFilter } from '@/components/GridTable/components/FilterCell/models/filterCell.model';
import type { ChangeEvent } from 'react';
import styles from '@/components/GridTable/components/FilterCell/FilterCell.module.css';

const InputFilter = ({ setFilterValue, label, filterValue }: TInputFilter) => {
  return (
    <div className={classNames('tableInputBox', styles.box)}>
      <Input
        name={label}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFilterValue(e.target.value);
        }}
        maxLength={250}
        aria-label={label ? `Filter by ${label}` : 'Filter column'}
        value={filterValue as string}
      />
    </div>
  );
};

export default InputFilter;
