'use client';

import Button from '@/components/Button/Button';
import { BUTTON_TYPE, BUTTON_SIZE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Textarea from '@/components/Textarea/Textarea';
import { SUGGESTIONS } from '../../constants/page.constant';
import { useForm } from './hooks/useForm';
import styles from './Form.module.css';

const Form = () => {
  const { textareaProps, onSubmit, canSubmit, handleSuggestion } = useForm();

  return (
    <>
      <ul className={styles.suggestions}>
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <Button
              buttonType={BUTTON_TYPE.ghost}
              size={BUTTON_SIZE.sm}
              text={s}
              onClick={() => {
                handleSuggestion(s);
              }}
            />
          </li>
        ))}
      </ul>

      <form
        className={styles.inputBox}
        onSubmit={(e) => {
          void onSubmit(e);
        }}
      >
        <Textarea
          {...textareaProps}
          placeholder='Ask about your sales data, leads, or deals…'
          rows={1}
        />
        <div className={styles.inputFooter}>
          <span className={styles.hint}>
            <kbd>↵</kbd> send &middot; <kbd>⇧↵</kbd> newline
          </span>
          <Button
            buttonType={BUTTON_TYPE.iconAccent}
            size={BUTTON_SIZE.sm}
            type='submit'
            disabled={!canSubmit}
            icon={<Icons.ArrowUp />}
          />
        </div>
      </form>
    </>
  );
};

export default Form;
