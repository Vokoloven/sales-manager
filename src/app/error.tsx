'use client';
import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import { APP_PATH } from '@/core/constants/appPath.constant';
import styles from './styles.module.css';

const GlobalError = ({
  error,
  unstable_retry
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) => {
  return (
    <main className={styles.root}>
      <p className={styles.code}>Error</p>
      <div className={styles.divider} />
      <h1 className={styles.title}>{error.message}</h1>
      <p className={styles.sub}>Unexpected error occurred.</p>
      <div className={styles.actions}>
        <Button
          text='Retry'
          buttonType={BUTTON_TYPE.outline}
          onClick={() => {
            unstable_retry();
          }}
        />

        <Button
          text='Home'
          icon={<Icons.Home />}
          onClick={() => {
            location.href = APP_PATH.base;
          }}
        />
      </div>
    </main>
  );
};

export default GlobalError;
