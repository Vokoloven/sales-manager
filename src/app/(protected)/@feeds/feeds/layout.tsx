import FeedsHeader from './components/FeedsHeader/FeedsHeader';
import type { PropsWithChildren } from 'react';
import styles from './layout.module.css';

const FeedsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.root}>
      <FeedsHeader />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FeedsLayout;
