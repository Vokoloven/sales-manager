import classnames from 'classnames';
import type { TButtonList } from './models/buttonList.model';
import styles from './ButtonList.module.css';

const ButtonList = ({ setRange, setFilterValue, setIsOpen }: TButtonList) => {
  const applyRange = (from: Date, to: Date) => {
    const end = new Date(to);
    end.setDate(end.getDate() + 1);

    setRange({ from, to });

    setFilterValue(`${from.toISOString()} - ${end.toISOString()}`);
    setIsOpen(false);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const last7days = new Date(now);
  last7days.setDate(now.getDate() - 6);

  return (
    <div className={classnames(styles.buttonList, 'day_picker_button_list')}>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            applyRange(now, now);
          }}
        >
          <span>Today</span>
        </button>
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            applyRange(yesterday, yesterday);
          }}
        >
          <span>Yesterday</span>
        </button>
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            applyRange(last7days, now);
          }}
        >
          <span>Last 7 days</span>
        </button>
      </div>
    </div>
  );
};

export default ButtonList;
