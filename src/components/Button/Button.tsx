import classNames from 'classnames';
import { Activity, memo } from 'react';
import { BUTTON_TYPE, BUTTON_SIZE } from './constants/button.constant';
import type { TButton } from './models/button.model';
import styles from './button.module.css';

const Button = ({
  children,
  icon,
  iconRight,
  text,
  isActive = false,
  buttonType = BUTTON_TYPE.primary,
  size = BUTTON_SIZE.md,
  type = 'button',
  ...rest
}: TButton) => {
  return (
    <button
      className={classNames('button', styles.btn, styles[buttonType], styles[size], {
        [styles.active]: isActive
      })}
      {...{ type, ...rest }}
    >
      <Activity mode={icon ? 'visible' : 'hidden'}>
        <span className={styles.iconWrap}>{icon}</span>
      </Activity>

      <Activity mode={text ? 'visible' : 'hidden'}>
        <span className={styles.text}>{text}</span>
      </Activity>

      <Activity mode={iconRight ? 'visible' : 'hidden'}>
        <span className={styles.iconWrap}>{iconRight}</span>
      </Activity>

      {children}
    </button>
  );
};

export default memo(Button);
