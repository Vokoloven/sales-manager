import FeedsHeader from './feeds/components/FeedsHeader/FeedsHeader';
import type { PropsWithChildren } from 'react';
import styles from './layout.module.css';

const FeedsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <FeedsHeader />
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FeedsLayout;
