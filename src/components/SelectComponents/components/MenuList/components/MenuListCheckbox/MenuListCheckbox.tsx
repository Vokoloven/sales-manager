import classnames from 'classnames';
import { Children, useRef } from 'react';
import { components } from 'react-select';
import { typedMemo } from '@/core/utils/typedMemo.util';
import { useSelectVirtualizer } from '../../hooks/useSelectVirtualizer';
import { isOptionElement } from '../../utils/isOptionElement';
import CheckboxOption from './components/CheckboxOption/CheckboxOption';
import SelectAllCheckbox from './components/SelectAllCheckbox/SelectAllCheckbox';
import type { TMenuListProps } from '../../models/menuList.model';
import type { TNullable } from '@/core/models/utility.model';

const MenuListCheckbox = <T,>(props: TMenuListProps<T>) => {
  const { children, innerProps, getValue, menuClassname, selectProps, ...rest } = props;

  const menuRef = useRef<TNullable<HTMLDivElement>>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { height, virtualItems, rows, measureRef, paddingTop, paddingBottom } =
    useSelectVirtualizer(children, menuRef);

  const optionChildren = Children.toArray(children).filter(isOptionElement<T>);
  const allOptions = optionChildren.map((child) => child.props.data);
  const shouldShowAllCheckbox = !selectProps.inputValue;

  return (
    <components.MenuList
      {...rest}
      innerRef={innerRef}
      getValue={getValue}
      selectProps={selectProps}
      innerProps={{
        ...innerProps,
        style: {
          ...innerProps.style,
          maxHeight: props.maxHeight
        }
      }}
      className={classnames(menuClassname, 'menu-list-checkbox')}
    >
      {rows.length ? (
        <div ref={menuRef} style={{ paddingTop, paddingBottom, minHeight: height }}>
          {shouldShowAllCheckbox && (
            <SelectAllCheckbox<T>
              selectProps={selectProps}
              getValue={getValue}
              allOptions={allOptions}
            />
          )}
          {virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];

            if (!isOptionElement(row)) {
              return null;
            }

            return (
              <div key={virtualRow.key} data-index={virtualRow.index} ref={measureRef}>
                <CheckboxOption {...row.props} />
              </div>
            );
          })}
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

export default typedMemo(MenuListCheckbox);
