import classNames from 'classnames';
import { Activity, memo } from 'react';
import type { TInput } from './models/input.model';
import styles from './Input.module.css';

const Input = ({ label, error, postfix, ref, ...rest }: TInput) => {
  return (
    <div className={classNames('inputWrapper', styles.inputWrap)}>
      <Activity mode={label ? 'visible' : 'hidden'}>
        <label
          className={classNames('inputLabel', styles.label, {
            labelDisabled: rest.disabled,
            [styles.labelDisabled]: rest.disabled
          })}
          htmlFor={rest.id}
        >
          {label}
        </label>
      </Activity>

      <div className={classNames('inputWrapperRow', styles.inputWrapper)}>
        <input
          ref={ref}
          className={classNames('input', styles.input, {
            [styles.errorInput]: error,
            inputError: error
          })}
          {...rest}
        />

        <Activity mode={postfix ? 'visible' : 'hidden'}>
          <div className={classNames('inputPostfix', styles.postfix)}>{postfix}</div>
        </Activity>
      </div>

      <Activity mode={error ? 'visible' : 'hidden'}>
        <span className={classNames('errorLabel', styles.error)}>{error}</span>
      </Activity>
    </div>
  );
};

export default memo(Input);
