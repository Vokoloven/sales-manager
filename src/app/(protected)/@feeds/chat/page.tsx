import Form from './components/Form/Form';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Chat | Sales Manager',
  description: 'Ask questions about your sales pipeline, leads, and deals.'
};

const ChatPage = () => {
  return (
    <div className={styles.root}>
      <section className={styles.hero} aria-label='Start a conversation'>
        <h1 className={styles.heading}>
          <span className={styles.headingAccent}>What can I</span>
          <br />
          help you with?
        </h1>
        <p className={styles.subheading}>Ask anything about your pipeline, leads, or deals.</p>
      </section>

      <div className={styles.inputArea}>
        <Form />
        <small className={styles.disclaimer}>
          Responses are generated from your CRM data and may not always be accurate.
        </small>
      </div>
    </div>
  );
};

export default ChatPage;
