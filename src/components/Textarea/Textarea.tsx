import classNames from 'classnames';
import { Activity, memo } from 'react';
import type { TTextarea } from './models/textrea.model';
import styles from './textrea.module.css';

const Textarea = ({ label, error, ref, ...rest }: TTextarea) => {
  return (
    <div className={classNames('textareaWrapper', styles.textareaWrap)}>
      <Activity mode={label ? 'visible' : 'hidden'}>
        <label
          className={classNames('textareaLabel', styles.label, {
            labelDisabled: rest.disabled,
            [styles.labelDisabled]: rest.disabled
          })}
          htmlFor={rest.id}
        >
          {label}
        </label>
      </Activity>

      <div className={classNames('textareaWrapperRow', styles.textareaWrapper)}>
        <textarea
          ref={ref}
          className={classNames('textarea', styles.textarea, {
            [styles.errorTextarea]: error,
            textareaError: error
          })}
          {...rest}
        />
      </div>

      <Activity mode={error ? 'visible' : 'hidden'}>
        <span className={classNames('errorLabel', styles.error)}>{error}</span>
      </Activity>
    </div>
  );
};

export default memo(Textarea);
