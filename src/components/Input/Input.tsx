import classNames from 'classnames';
import { forwardRef, memo } from 'react';
import type { TInput } from './models/input.model';
import styles from './Input.module.css';

const Input = memo(
  forwardRef<HTMLInputElement, TInput>(({ label, error, postfix, ...rest }, ref) => {
    return (
      <div className={classNames('inputWrapper', styles.inputWrap)}>
        {label && (
          <label
            className={classNames('inputLabel', styles.label, {
              labelDisabled: rest.disabled,
              [styles.labelDisabled]: rest.disabled
            })}
            htmlFor={rest.id}
          >
            {label}
          </label>
        )}

        <div className={classNames('inputWrapperRow', styles.inputWrapper)}>
          <input
            ref={ref}
            className={classNames('input', styles.input, {
              [styles.errorInput]: error,
              inputError: error
            })}
            {...rest}
          />
          {postfix && <div className={classNames('inputPostfix', styles.postfix)}>{postfix}</div>}
        </div>

        {error && <span className={classNames('errorLabel', styles.error)}>{error}</span>}
      </div>
    );
  })
);

Input.displayName = 'Input';

export default Input;
