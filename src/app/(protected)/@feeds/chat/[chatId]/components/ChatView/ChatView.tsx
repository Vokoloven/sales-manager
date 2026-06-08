'use client';

import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import DotsLoader from '@/components/DotsLoader/DotsLoader';
import { Icons } from '@/components/Icons/Icons';
import Textarea from '@/components/Textarea/Textarea';
import Message from './components/Message/Message';
import ScrollToBottomButton from './components/ScrollToBottomButton/ScrollToBottomButton';
import { ITEM_GAP } from './constants/chatView.constant';
import { useMessageForm } from './hooks/useMessageForm';
import { useMessagesInfinite } from './hooks/useMessagesInfinite';
import type { TChatViewProps } from './models/chatView.model';
import styles from './ChatView.module.css';

const ChatView = ({ chatId, initialData, socketUrl, accessToken }: TChatViewProps) => {
  const {
    items,
    isLoading,
    isSending,
    scrollRef,
    virtualItems,
    paddingTop,
    paddingBottom,
    measureRef,
    sendMessage,
    showScrollButton,
    scrollToBottom
  } = useMessagesInfinite(initialData, chatId, socketUrl, accessToken);

  const { textareaProps, onSubmit, canSubmit } = useMessageForm(sendMessage);

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper}>
        <div className={styles.messages} ref={scrollRef}>
          {isLoading && <DotsLoader label='Loading older messages' />}

          <div style={{ paddingTop, paddingBottom }}>
            {virtualItems.map((virtualRow) => {
              const message = items[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={measureRef}
                  style={{ paddingBottom: ITEM_GAP }}
                >
                  <Message message={message} />
                </div>
              );
            })}
          </div>

          {isSending && (
            <div className={styles.typingRow}>
              <div className={styles.typingAvatar}>AI</div>
              <div className={styles.typingBubble}>
                <DotsLoader label='AI is typing' />
              </div>
            </div>
          )}
        </div>

        <ScrollToBottomButton visible={showScrollButton} onClick={scrollToBottom} />
      </div>

      <div className={styles.inputArea}>
        <form
          id='chat-form'
          className={styles.inputBox}
          onSubmit={(e) => {
            void onSubmit(e);
          }}
        >
          <Textarea
            id='chat-form-textarea'
            {...textareaProps}
            placeholder='Ask about your sales data, leads, or deals…'
            rows={1}
            disabled={isSending}
          />
          <div className={styles.inputFooter}>
            <span className={styles.hint}>
              <kbd>↵</kbd> send &middot; <kbd>⇧↵</kbd> newline
            </span>
            <Button
              form='chat-message-form'
              buttonType={BUTTON_TYPE.iconAccent}
              size={BUTTON_SIZE.sm}
              type='submit'
              aria-label='Send message'
              disabled={!canSubmit || isSending}
              icon={<Icons.ArrowUp />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
