'use client';

import { Activity } from 'react';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Input from '@/components/Input/Input';
import { LOGIN_FORM_FIELD } from '../constants/login.constant';
import { useForm } from '../hooks/useForm';
import styles from '../page.module.css';

const Form = () => {
  const {
    state,
    showPassword,
    setShowPassword,
    googleLogin,
    login,
    form: {
      register,
      handleSubmit,

      formState: { errors, isSubmitting }
    }
  } = useForm();

  return (
    <>
      <Activity mode={state?.success === false ? 'visible' : 'hidden'}>
        <div className={styles.errorBox}>{state?.error?.errorCode}</div>
      </Activity>
      <form
        noValidate
        id='login'
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          void handleSubmit((data) => {
            login(data);
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
        <div className={styles.buttonWrapper}>
          <Button type='submit' form='login' disabled={isSubmitting}>
            Sign in
          </Button>
          <span className={styles.divider}>or</span>
          <Button
            icon={<Icons.Google />}
            buttonType='outline'
            onClick={() => {
              googleLogin();
            }}
          >
            Sign in with Google
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
