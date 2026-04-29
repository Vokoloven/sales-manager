import Spinner from '@/components/Spinner/Spinner';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <main className={styles.root}>
      <section className={styles.section}>
        <h1>Loading...</h1>
        <Spinner />
      </section>
    </main>
  );
};

export default Loading;
