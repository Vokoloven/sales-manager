import classnames from 'classnames';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
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
      <Button
        buttonType={BUTTON_TYPE.ghost}
        size={BUTTON_SIZE.xs}
        text='Today'
        onClick={() => {
          applyRange(now, now);
        }}
      />
      <Button
        buttonType={BUTTON_TYPE.ghost}
        size={BUTTON_SIZE.xs}
        text='Yesterday'
        onClick={() => {
          applyRange(yesterday, yesterday);
        }}
      />
      <Button
        buttonType={BUTTON_TYPE.ghost}
        size={BUTTON_SIZE.xs}
        text='Last 7 days'
        onClick={() => {
          applyRange(last7days, now);
        }}
      />
    </div>
  );
};

export default ButtonList;
