import classnames from 'classnames';
import { useRef } from 'react';
import { components } from 'react-select';
import { typedMemo } from '@/core/utils/typedMemo.util';
import { useSelectVirtualizer } from '../../hooks/useSelectVirtualizer';
import type { TMenuListProps } from './../../models/menuList.model';
import type { TNullable } from '@/core/models/utility.model';
import type { ComponentRef } from 'react';

const MenuListVirtual = <T,>(props: TMenuListProps<T>) => {
  const { children, innerProps, menuClassname, ...rest } = props;

  const menuRef = useRef<TNullable<ComponentRef<'div'>>>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { height, virtualItems, rows, measureRef } = useSelectVirtualizer(children, menuRef);

  return (
    <components.MenuList
      {...rest}
      innerRef={innerRef}
      innerProps={{
        ...innerProps,
        style: {
          ...innerProps.style,
          maxHeight: props.maxHeight
        }
      }}
      className={classnames(menuClassname, 'menu-list-virtual')}
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
