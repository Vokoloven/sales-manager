import { Suspense, type CSSProperties } from 'react';
import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import Loading from '@/components/Loading/Loading';
import { COOKIES } from '@/core/constants/cookies.constant';
import { cookiesService } from '@/core/services/Cookies.service';
import { recoverUserService } from '@/shared/recoverUser/services/RecoverUser.service';
import ChatList from './components/ChatList/ChatList';
import LogOutButton from './components/LogOutButton/LogOutButton';
import NavButtons from './components/NavButtons/NavButtons';
import { ASIDE } from './components/ResizeHandle/constants/resizeHandle.constant';
import ResizeHandle from './components/ResizeHandle/ResizeHandle';
import styles from './default.module.css';

const AsideDefault = async () => {
  const width = await cookiesService.get(COOKIES.asideWidth);
  const collapsed = await cookiesService.has(COOKIES.asideCollapsed);

  const recoverUser = await recoverUserService.recoverUser();

  return (
    <aside
      className={styles.aside}
      style={{ [ASIDE.asideWidthName]: width ? `${width}px` : undefined } as CSSProperties}
      data-aside-collapsed={collapsed ? '' : undefined}
      aria-label='Recent'
    >
      <div className={styles.header}>
        <span className={styles.headerTitle}>Recent</span>
      </div>

      <Suspense key={crypto.randomUUID()} fallback={<Loading />}>
        <ChatList />
      </Suspense>

      <footer className={styles.footer}>
        <nav id='user-popover' popover='auto' className={styles.popover}>
          <NavButtons />
          <div className={styles.popoverSep} />
          <LogOutButton />
        </nav>

        <Button
          buttonType={BUTTON_TYPE.ghost}
          popoverTarget='user-popover'
          aria-label={`User menu – ${String(recoverUser.data?.account.firstName)} (${String(recoverUser.data?.account.email)})`}
        >
          <div className={styles.userAvatar}>{recoverUser.data?.account.firstName.slice(0, 1)}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{recoverUser.data?.account.firstName}</span>
            <span className={styles.userEmail}>{recoverUser.data?.account.email}</span>
          </div>
          <span className={styles.dots} aria-hidden='true'>
            ···
          </span>
        </Button>
      </footer>

      <ResizeHandle />
    </aside>
  );
};

export default AsideDefault;
