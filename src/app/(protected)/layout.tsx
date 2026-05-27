import type { PropsWithChildren, ReactNode } from 'react';
import styles from './layout.module.css';

const ProtectedLayout = ({
  aside,
  feeds
}: Readonly<PropsWithChildren<{ aside: ReactNode; feeds: ReactNode }>>) => {
  return (
    <div className={styles.root}>
      {aside}
      <main>{feeds}</main>
    </div>
  );
};

export default ProtectedLayout;
