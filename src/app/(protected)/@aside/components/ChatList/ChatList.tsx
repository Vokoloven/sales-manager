import Link from 'next/link';
import { Icons } from '@/components/Icons/Icons';
import { chatService } from '../../services/Chat.service';
import ChatListVirtual from './ChatListVirtual';
import styles from './ChatList.module.css';

const ChatList = async () => {
  const result = await chatService.getPaginatedChats(1);

  if (!result.success || !result.data.items.length) {
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

  const { items, pageNumber, totalPages } = result.data;

  return (
    <ChatListVirtual
      initialData={{
        items,
        hasMore: pageNumber < totalPages
      }}
    />
  );
};

export default ChatList;
