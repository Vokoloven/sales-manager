import type { TCreatableOptionType } from '@/components/SelectComponents/components/MenuList/models/menuList.model';
import type { GroupBase, MenuListProps } from 'react-select';

type TSelectAllCheckbox<TOption, IsMulti extends boolean = boolean> = {
  allOptions: TCreatableOptionType<TOption>[];
} & Pick<
  MenuListProps<TCreatableOptionType<TOption>, IsMulti, GroupBase<TCreatableOptionType<TOption>>>,
  'getValue' | 'selectProps'
>;

export type { TSelectAllCheckbox };
