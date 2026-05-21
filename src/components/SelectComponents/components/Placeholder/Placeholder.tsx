import classNames from 'classnames';
import { components } from 'react-select';
import { typedMemo } from '@/core/utils/typedMemo.util';
import type { TPlaceholderProps } from './models/placeholder.model';
import styles from './Placeholder.module.css';

const Placeholder = <T,>(props: TPlaceholderProps<T>) => {
  return (
    <components.Placeholder {...props}>
      {!props.selectProps.menuIsOpen && !!props.label && (
        <div className={classNames(styles.label)}>
          {`${props.label} ${!props.required ? '(optional)' : ''}`}
        </div>
      )}
      <div className={styles.propsChildren}>{props.children}</div>
    </components.Placeholder>
  );
};

export default typedMemo(Placeholder);
