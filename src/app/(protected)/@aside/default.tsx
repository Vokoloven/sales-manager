import { Suspense, type CSSProperties } from 'react';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Loading from '@/components/Loading/Loading';
import NavLink from '@/components/NavLink/NavLink';
import { APP_PATH } from '@/core/constants/appPath.constant';
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

      <nav className={styles.nav}>
        <NavLink
          href={APP_PATH.chat}
          text='New Chat'
          buttonType={BUTTON_TYPE.outline}
          size={BUTTON_SIZE.sm}
          iconRight={<Icons.Chat />}
        />
      </nav>

      <Suspense fallback={<Loading />}>
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
