'use client';

import ChatButton from '../ChatButton/ChatButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import RenameButton from '../RenameButton/RenameButton';
import { ITEM_GAP } from './constants/chatListVirtual.constant';
import { useChatListInfinite } from './hooks/useChatListInfinite';
import type { TChatListVirtualProps } from './models/chatListVirtual.model';
import styles from './ChatList.module.css';

const ChatListVirtual = ({ initialData }: TChatListVirtualProps) => {
  const { items, scrollRef, virtualItems, paddingTop, paddingBottom, measureRef } =
    useChatListInfinite(initialData);

  return (
    <div className={styles.list} ref={scrollRef} role='list'>
      <div style={{ paddingTop, paddingBottom }}>
        {virtualItems.map((virtualRow) => {
          const chat = items[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={measureRef}
              style={{ paddingBottom: ITEM_GAP }}
            >
              <div className={styles.buttons} role='listitem'>
                <ChatButton id={String(chat.id)} name={chat.name} />

                <div
                  className={styles.popoverOptions}
                  id={`options-${String(chat.id)}`}
                  popover='auto'
                  style={{ positionAnchor: `--options-button-${String(chat.id)}` }}
                >
                  <RenameButton id={String(chat.id)} name={chat.name} />

                  <DeleteButton id={String(chat.id)} name={chat.name} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatListVirtual;
