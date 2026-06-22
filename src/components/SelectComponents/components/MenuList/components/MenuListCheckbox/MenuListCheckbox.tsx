import classnames from 'classnames';
import { components } from 'react-select';
import { typedMemo } from '@/core/utils/typedMemo.util';
import { useSelectVirtualizer } from '../../hooks/useSelectVirtualizer';
import { isOptionElement } from '../../utils/isOptionElement';
import CheckboxOption from './components/CheckboxOption/CheckboxOption';
import SelectAllCheckbox from './components/SelectAllCheckbox/SelectAllCheckbox';
import { useMenuListCheckbox } from './hooks/useMenuListCheckbox';
import type { TMenuListProps } from '../../models/menuList.model';

const MenuListCheckbox = <T, IsMulti extends boolean = false>(
  props: TMenuListProps<T, IsMulti>
) => {
  const { innerRef, menuRef, allOptions, shouldShowAllCheckbox } = useMenuListCheckbox(props);

  const { height, virtualItems, rows, measureRef, paddingTop, paddingBottom } =
    useSelectVirtualizer(props.children, menuRef);

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
      className={classnames(props.menuClassname, 'menu-list-checkbox')}
    >
      {rows.length ? (
        <div ref={menuRef} style={{ paddingTop, paddingBottom, minHeight: height }}>
          {shouldShowAllCheckbox && (
            <SelectAllCheckbox<T>
              selectProps={props.selectProps}
              getValue={props.getValue}
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
