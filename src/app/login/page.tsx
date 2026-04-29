import Image from 'next/image';
import Form from './components/Form';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sign in | Sales Manager',
  description: 'Authentication in application'
};

const LoginPage = () => {
  return (
    <main className={styles.root}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image src='/sales-manager.svg' alt='Product Icon' width={32} height={32} />
          </div>
          <span className={styles.brandName}>Sales Manager</span>
        </div>
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.sub}>Sign in to your account to continue</p>
        <Form />
      </div>
    </main>
  );
};

export default LoginPage;
