import { Children, useRef } from 'react';
import { isOptionElement } from '@/components/SelectComponents/components/MenuList/utils/isOptionElement';
import type { TMenuListProps } from '@/components/SelectComponents/components/MenuList/models/menuList.model';
import type { ComponentRef } from 'react';

const useMenuListCheckbox = <T, IsMulti extends boolean = false>(
  props: TMenuListProps<T, IsMulti>
) => {
  const menuRef = useRef<ComponentRef<'div'>>(null);
  const innerRef = useRef<ComponentRef<'div'>>(null);

  const { children, selectProps } = props;

  const optionChildren = Children.toArray(children).filter(isOptionElement<T>);
  const allOptions = optionChildren.map((child) => child.props.data);
  const shouldShowAllCheckbox = !selectProps.inputValue;

  return { menuRef, innerRef, allOptions, shouldShowAllCheckbox } as const;
};

export { useMenuListCheckbox };
