import { useCallback, useEffect, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { useForm as useReactHookForm, useWatch } from 'react-hook-form';
import type { TFormValue } from './models/useMessageForm.model';
import type { ComponentRef } from 'react';

const useMessageForm = (onSend: (text: string) => Promise<void>) => {
  const { setValue, handleSubmit, control, reset } = useReactHookForm<TFormValue>({
    defaultValues: { message: '' }
  });

  const textareaRef = useRef<ComponentRef<'textarea'>>(null);
  const isMounted = useRef(false);
  const message = useWatch({ control, name: 'message' });

  const resize = useCallback((el: ComponentRef<'textarea'>) => {
    el.style.height = 'auto';
    el.style.height = `${String(Math.min(el.scrollHeight, 240))}px`;
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<ComponentRef<'textarea'>>) => {
      setValue('message', e.target.value);
      resize(e.target);
    },
    [setValue, resize]
  );

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (!message && textareaRef.current) {
      resize(textareaRef.current);
      textareaRef.current.focus();
    }
  }, [message, resize]);

  const handleSuccess = useCallback(
    async (data: TFormValue) => {
      const text = data.message.trim();
      if (!text) return;
      await onSend(text);
      reset();
    },
    [onSend, reset]
  );

  const onSubmit = handleSubmit(handleSuccess);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<ComponentRef<'textarea'>>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        void onSubmit();
      }
    },
    [onSubmit]
  );

  const canSubmit = message.trim().length > 0;

  return {
    textareaProps: {
      ref: textareaRef,
      value: message,
      onChange: handleChange,
      onKeyDown: handleKeyDown
    },
    onSubmit,
    canSubmit
  } as const;
};

export { useMessageForm };
