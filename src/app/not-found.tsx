'use client';

import { useRouter } from 'next/navigation';
import { Icons } from '@/shared/Icons/Icons';
import styles from './not-found.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className={styles.root}>
      <p className={styles.code}>404</p>
      <div className={styles.divider} />
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.sub}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className={styles.actions}>
        <button
          className={styles.btnBack}
          onClick={() => {
            router.back();
          }}
        >
          <Icons.ArrowLeft />
          Go back
        </button>
        <button
          className={styles.btnHome}
          onClick={() => {
            router.push('/');
          }}
        >
          Home
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
