import classNames from 'classnames';
import Link from 'next/link';
import { Activity, memo } from 'react';
import { BUTTON_TYPE, BUTTON_SIZE } from '@/components/Button/constants/button.constant';
import type { TNavLink } from './models/navLink.model';
import styles from './NavLink.module.css';
import buttonStyles from '@/components/Button/button.module.css';

const NavLink = ({
  children,
  icon,
  iconRight,
  text,
  isActive = false,
  buttonType = BUTTON_TYPE.primary,
  size = BUTTON_SIZE.md,
  ...rest
}: TNavLink) => {
  return (
    <Link
      className={classNames(
        'button',
        styles.link,
        buttonStyles.btn,
        buttonStyles[buttonType],
        buttonStyles[size],
        {
          [buttonStyles.active]: isActive
        }
      )}
      {...rest}
    >
      <Activity mode={icon ? 'visible' : 'hidden'}>
        <span className={buttonStyles.iconWrap}>{icon}</span>
      </Activity>

      <Activity mode={text ? 'visible' : 'hidden'}>
        <span className={buttonStyles.text}>{text}</span>
      </Activity>

      <Activity mode={iconRight ? 'visible' : 'hidden'}>
        <span className={buttonStyles.iconWrap}>{iconRight}</span>
      </Activity>

      {children}
    </Link>
  );
};

export default memo(NavLink);
