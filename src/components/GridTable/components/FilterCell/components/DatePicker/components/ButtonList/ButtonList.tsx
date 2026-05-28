import classnames from 'classnames';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { useButtonList } from './hooks/useButtonList';
import type { TButtonList } from './models/buttonList.model';
import styles from './ButtonList.module.css';

const ButtonList = (props: TButtonList) => {
  const { lastWeek, now, yesterday, applyRange } = useButtonList(props);

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
          applyRange(lastWeek, now);
        }}
      />
    </div>
  );
};

export default ButtonList;
