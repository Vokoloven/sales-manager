import { recoverUserService } from '@/shared/recoverUser/services/RecoverUser.service';
import type { PropsWithChildren, ReactNode } from 'react';
import styles from './layout.module.css';

const ProtectedLayout = async ({
  aside,
  dashboard
}: Readonly<PropsWithChildren<{ aside: ReactNode; dashboard: ReactNode }>>) => {
  await recoverUserService.recoverUser();

  return (
    <div className={styles.root}>
      {aside}
      {dashboard}
    </div>
  );
};

export default ProtectedLayout;
