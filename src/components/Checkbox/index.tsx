import classnames from 'classnames';
import { useEffect, useRef } from 'react';
import type { CheckboxProps } from './models/checkbox.model';
import styles from './Checkbox.module.css';

const Checkbox = ({ indeterminate = false, error, ...rest }: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={classnames('Checkbox__wrapper', styles.wrapper)}>
      <input
        className={classnames('Checkbox__input', styles.input, {
          [styles.error]: error
        })}
        {...rest}
        type='checkbox'
        ref={ref}
      />
    </div>
  );
};

export default Checkbox;
