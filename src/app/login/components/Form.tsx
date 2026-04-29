'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import Input from '@/components/Input/Input';
import { Icons } from '@/shared/Icons/Icons';
import { login } from '../actions/login.action';
import { LOGIN_FORM_FIELD } from '../constants/login.constant';
import { useForm } from '../hooks/useForm';
import styles from '../page.module.css';

const Form = () => {
  const router = useRouter();
  const {
    showPassword,
    setShowPassword,
    form: {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
    }
  } = useForm();

  return (
    <form
      noValidate
      id='login'
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();

        void handleSubmit(async (data) => {
          try {
            await login({
              dto: data,
              onSuccess: () => {
                router.push('/dashboard');
              },
              onSettled: reset
            });
          } catch (_error) {
            //
          }
        })();
      }}
    >
      <div className={styles.field}>
        <div className={styles.fieldWrap}>
          <Input
            id={LOGIN_FORM_FIELD.email}
            label='Email'
            placeholder='email@example.com'
            autoComplete='off'
            disabled={isSubmitting}
            error={errors[LOGIN_FORM_FIELD.email]?.message}
            {...register(LOGIN_FORM_FIELD.email)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldWrap}>
          <Input
            id={LOGIN_FORM_FIELD.password}
            type={showPassword ? 'text' : LOGIN_FORM_FIELD.password}
            label='Password'
            placeholder='••••••••'
            autoComplete='off'
            disabled={isSubmitting}
            error={errors[LOGIN_FORM_FIELD.password]?.message}
            {...register(LOGIN_FORM_FIELD.password)}
            postfix={
              <Button
                buttonType={BUTTON_TYPE.iconGhost}
                size={BUTTON_SIZE.xs}
                aria-label='Show and hide password'
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                icon={showPassword ? <Icons.ShowPassword /> : <Icons.HidePassword />}
              />
            }
          />
        </div>
      </div>
      <Button type='submit' form='login' disabled={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
};

export default Form;
