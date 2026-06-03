import Link from 'next/link';
import { Icons } from '@/components/Icons/Icons';
import { chatService } from '../../services/Chat.service';
import ChatButton from '../ChatButton/ChatButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import RenameButton from '../RenameButton/RenameButton';
import type { ReactNode } from 'react';
import styles from './ChatList.module.css';

const ChatList = async () => {
  const chats = await chatService.getChats();
  const hasChats = Boolean(chats.data?.length);

  let content: ReactNode = (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        <Icons.Chat />
      </div>
      <p className={styles.emptyText}>No chats yet</p>
      <Link href='/chat' className={styles.emptyLink}>
        Start a chat
      </Link>
    </div>
  );

  if (hasChats) {
    content = chats.data?.map(({ id, name }) => (
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
    ));
  }

  return (
    <div className={styles.list} role='list'>
      {content}
    </div>
  );
};

export default ChatList;
