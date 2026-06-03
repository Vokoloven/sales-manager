import { useRouter } from 'next/navigation';
import { useRef, useCallback, useEffect, type KeyboardEvent, type ChangeEvent } from 'react';
import { useForm as useReactHookForm, useWatch } from 'react-hook-form';
import { createChatAction } from '@/app/(protected)/@feeds/chat/actions/chat.action';
import { APP_PATH } from '@/core/constants/appPath.constant';
import type { TFormValue } from './models/useForm.model';
import type { ComponentRef } from 'react';

const useForm = () => {
  const router = useRouter();
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

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      setValue('message', suggestion);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          resize(textareaRef.current);
          textareaRef.current.focus();
        }
      });
    },
    [setValue, resize]
  );

  const handleSuccess = useCallback(
    async (data: TFormValue) => {
      const result = await createChatAction({ name: data.message });
      reset();
      if (result.success) router.replace(`${APP_PATH.chat}/${String(result.data.id)}`);
    },
    [reset, router]
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
    canSubmit,
    handleSuggestion
  } as const;
};

export { useForm };
