import classnames from 'classnames';
import { components } from 'react-select';
import { typedMemo } from '@/core/utils/typedMemo.util';
import { useSelectVirtualizer } from '../../hooks/useSelectVirtualizer';
import { useMenuListVirtual } from './hooks/useMenuListVirtual';
import type { TMenuListProps } from './../../models/menuList.model';

const MenuListVirtual = <T,>(props: TMenuListProps<T>) => {
  const { innerRef, menuRef } = useMenuListVirtual();

  const { height, virtualItems, rows, measureRef } = useSelectVirtualizer(props.children, menuRef);

  return (
    <components.MenuList
      {...props}
      innerRef={innerRef}
      innerProps={{
        ...props.innerProps,
        'aria-label': props.selectProps['aria-label'],
        style: {
          ...props.innerProps.style,
          maxHeight: props.maxHeight
        }
      }}
      className={classnames(props.menuClassname, 'menu-list-virtual')}
    >
      {rows.length ? (
        <div ref={menuRef} style={{ minHeight: height }}>
          {virtualItems.map((virtualRow) => (
            <div key={virtualRow.key} data-index={virtualRow.index} ref={measureRef}>
              {rows[virtualRow.index]}
            </div>
          ))}
        </div>
      ) : (
        <components.NoOptionsMessage
          {...props}
          innerProps={{ ...props.innerProps, style: { ...props.innerProps.style } }}
        />
      )}
    </components.MenuList>
  );
};

export default typedMemo(MenuListVirtual);
