import type { TMessage } from '../../models/chatView.model';
import styles from './Message.module.css';

type TMessageProps = { message: TMessage };

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const Message = ({ message }: TMessageProps) => {
  const isUser = !message.isBot;

  return (
    <div className={isUser ? styles.rowUser : styles.rowAssistant}>
      {message.isBot && <div className={styles.avatar}>AI</div>}
      <div className={isUser ? styles.bubbleUser : styles.bubbleAssistant}>
        <p className={styles.text}>{message.content}</p>
        <time className={styles.time} dateTime={message.created}>
          {formatTime(message.created)}
        </time>
      </div>
    </div>
  );
};

export default Message;
