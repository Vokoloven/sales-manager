import Link from 'next/link';
import { Icons } from '@/components/Icons/Icons';
import { chatService } from '../../services/Chat.service';
import ChatListVirtual from './ChatListVirtual';
import styles from './ChatList.module.css';

const ChatList = async () => {
  const chats = await chatService.getChats();
  const hasChats = Boolean(chats.data?.length);

  if (!hasChats) {
    return (
      <div className={styles.list} role='list'>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <Icons.Chat />
          </div>
          <p className={styles.emptyText}>No chats yet</p>
          <Link href='/chat' className={styles.emptyLink}>
            Start a chat
          </Link>
        </div>
      </div>
    );
  }

  return <ChatListVirtual chats={chats.data ?? []} />;
};

export default ChatList;
