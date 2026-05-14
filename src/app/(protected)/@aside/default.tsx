import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { recoverUserService } from '@/shared/recoverUser/services/RecoverUser.service';
import LogOutButton from './components/LogOutButton';
import NavButtons from './components/NavButtons/NavButtons';
import { chatService } from './services/Chat.service';
import styles from './default.module.css';

const AsideDefault = async () => {
  const recoverUser = await recoverUserService.recoverUser();
  const _chats = await chatService.getChats();

  return (
    <aside className={styles.aside} aria-label='Recent'>
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

        <Button buttonType={BUTTON_TYPE.ghost} popoverTarget='user-popover' aria-label='User Menu'>
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
    </aside>
  );
};

export default AsideDefault;
