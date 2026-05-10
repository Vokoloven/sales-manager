import Image from 'next/image';
import Form from './components/Form';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sign in | Sales Manager',
  description: 'Authentication'
};

const LoginPage = () => {
  return (
    <main className={styles.root}>
      <section className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image src='/sales-manager.svg' alt='Product Icon' width={32} height={32} />
          </div>
          <span className={styles.brandName}>Sales Manager</span>
        </div>
        <p className={styles.heading}>Welcome back</p>
        <h1 className={styles.sub}>Sign in to your account to continue</h1>
        <Form />
      </section>
    </main>
  );
};

export default LoginPage;
