import { cookies } from 'next/headers';
import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { recoverUserService } from '@/shared/recoverUser/services/RecoverUser.service';
import LogOutButton from './components/LogOutButton';
import NavButtons from './components/NavButtons/NavButtons';
import ResizeHandle from './components/ResizeHandle/ResizeHandle';
import { chatService } from './services/Chat.service';
import type { CSSProperties } from 'react';
import styles from './default.module.css';

const AsideDefault = async () => {
  const cookieStore = await cookies();
  const width = cookieStore.get('aside-width')?.value;
  const collapsed = cookieStore.has('aside-collapsed');

  const recoverUser = await recoverUserService.recoverUser();
  const _chats = await chatService.getChats();

  return (
    <aside
      className={styles.aside}
      style={{ '--aside-width': width ? `${width}px` : undefined } as CSSProperties}
      data-aside-collapsed={collapsed ? '' : undefined}
      aria-label='Recent'
    >
      <div className={styles.header}>
        <span className={styles.headerTitle}>Recent</span>
      </div>

      <div className={styles.list} role='list'>
        {/* {chats.data?.map(({ id, name }) => (
          <Link className={styles.popoverItem} key={id} href={`/chat/${String(id)}`}>
            {name}
          </Link>
        ))} */}
      </div>

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
