import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { COOKIES } from '@/core/constants/cookies.constant';
import { cookiesService } from '@/core/services/Cookies.service';
import { recoverUserService } from '@/shared/recoverUser/services/RecoverUser.service';
import ChatButton from './components/ChatButton/ChatButton';
import DeleteButton from './components/DeleteButton/DeleteButton';
import LogOutButton from './components/LogOutButton';
import NavButtons from './components/NavButtons/NavButtons';
import RenameButton from './components/RenameButton/RenameButton';
import { ASIDE } from './components/ResizeHandle/constants/resizeHandle.constant';
import ResizeHandle from './components/ResizeHandle/ResizeHandle';
import { chatService } from './services/Chat.service';
import type { CSSProperties } from 'react';
import styles from './default.module.css';

const AsideDefault = async () => {
  const width = await cookiesService.get(COOKIES.asideWidth);
  const collapsed = await cookiesService.has(COOKIES.asideCollapsed);

  const recoverUser = await recoverUserService.recoverUser();
  const chats = await chatService.getChats();

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

      <div className={styles.list} role='list'>
        {chats.data?.map(({ id, name }) => (
          <div className={styles.buttons} key={id} role='listitem'>
            <ChatButton id={String(id)} name={name} />

            <div
              className={styles.popoverOptions}
              id={`options-${String(id)}`}
              popover='auto'
              style={{ positionAnchor: `--options-button-${String(id)}` }}
            >
              <RenameButton id={String(id)} name={name} />

              <DeleteButton id={String(id)} name={name} />
            </div>
          </div>
        ))}
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
