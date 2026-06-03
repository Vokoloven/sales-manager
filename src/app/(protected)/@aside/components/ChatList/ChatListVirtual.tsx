'use client';

import { useRef } from 'react';
import ChatButton from '../ChatButton/ChatButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import RenameButton from '../RenameButton/RenameButton';
import { useChatListVirtualizer } from './hooks/useChatListVirtualizer';
import type { TChatListVirtualProps } from './models/chatListVirtual.model';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';
import styles from './ChatList.module.css';

const ChatListVirtual = ({ chats }: TChatListVirtualProps) => {
  const scrollRef = useRef<TNullable<ComponentRef<'div'>>>(null);
  const { virtualItems, paddingTop, paddingBottom, measureRef } = useChatListVirtualizer(
    chats,
    scrollRef
  );

  return (
    <div className={styles.list} ref={scrollRef} role='list'>
      <div style={{ paddingTop, paddingBottom }}>
        {virtualItems.map((virtualRow) => {
          const chat = chats[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={measureRef}
              style={{ paddingBottom: 6 }}
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
