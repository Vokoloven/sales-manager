import type { PropsWithChildren, ReactNode } from 'react';
import styles from './layout.module.css';

const ProtectedLayout = async ({
  aside,
  feeds
}: Readonly<PropsWithChildren<{ aside: ReactNode; feeds: ReactNode }>>) => {
  return (
    <div className={styles.root}>
      {aside}
      {feeds}
    </div>
  );
};

export default ProtectedLayout;
