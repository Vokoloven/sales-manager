import { Icons } from '@/components/Icons/Icons';
import styles from './ScrollToBottomButton.module.css';

type TScrollToBottomButtonProps = {
  visible: boolean;
  onClick: () => void;
};

const ScrollToBottomButton = ({ visible, onClick }: TScrollToBottomButtonProps) => (
  <button
    className={styles.button}
    data-visible={visible}
    onClick={onClick}
    aria-label='Scroll to bottom'
    tabIndex={visible ? 0 : -1}
  >
    <Icons.ArrowDown />
  </button>
);

export default ScrollToBottomButton;
