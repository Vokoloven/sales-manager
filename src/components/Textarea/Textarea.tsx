import classNames from 'classnames';
import { forwardRef, memo } from 'react';
import type { TTextarea } from './models/textrea.model';
import styles from './textrea.module.css';

const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TTextarea>(({ label, error, ...rest }, ref) => {
    return (
      <div className={classNames('textareaWrapper', styles.textareaWrap)}>
        {label && (
          <label
            className={classNames('textareaLabel', styles.label, {
              labelDisabled: rest.disabled,
              [styles.labelDisabled]: rest.disabled
            })}
            htmlFor={rest.id}
          >
            {label}
          </label>
        )}

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

        {error && <span className={classNames('errorLabel', styles.error)}>{error}</span>}
      </div>
    );
  })
);

Textarea.displayName = 'Textarea';

export default Textarea;
