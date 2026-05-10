'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { Icons } from '@/components/Icons/Icons';
import { APP_PATH } from '@/core/constants/appPath.constant';
import styles from './styles.module.css';

const RootNotFound = () => {
  const router = useRouter();

  return (
    <main className={styles.root}>
      <section className={styles.section}>
        <p className={styles.code}>404</p>
        <div className={styles.divider} />
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.sub}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Button
            icon={<Icons.Home />}
            onClick={() => {
              router.push(APP_PATH.base);
            }}
          >
            Home
          </Button>
        </div>
      </section>
    </main>
  );
};

export default RootNotFound;
