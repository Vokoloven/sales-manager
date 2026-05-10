import { redirect } from 'next/navigation';
import { APP_PATH } from '@/core/constants/appPath.constant';
import { recoverUserService } from '@/shared/recoverUser/services/RecoverUser.service';
import type { PropsWithChildren, ReactNode } from 'react';
import styles from './layout.module.css';

const ProtectedLayout = async ({
  aside,
  dashboard
}: Readonly<PropsWithChildren<{ aside: ReactNode; dashboard: ReactNode }>>) => {
  const result = await recoverUserService.recoverUser();

  if (!result.success) {
    redirect(APP_PATH.base);
  }

  return (
    <div className={styles.root}>
      {aside}
      {dashboard}
    </div>
  );
};

export default ProtectedLayout;
