import classNames from 'classnames';
import React, { type ChangeEvent, type FC } from 'react';
import type { TInputFilter } from '@/components/GridTable/components/FilterCell/models/filterCell.model';
import styles from '@/components/GridTable/components/FilterCell/FilterCell.module.css';

const InputFilter: FC<TInputFilter> = ({ setFilterValue }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterValue(value);
  };

  return (
    <div className={classNames('tableInputBox', styles.box)}>
      <input type='text' className={styles.input} onChange={handleChange} maxLength={250} />
    </div>
  );
};

export default InputFilter;
