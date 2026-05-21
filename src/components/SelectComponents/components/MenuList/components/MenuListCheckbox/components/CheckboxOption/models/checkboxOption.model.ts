import type { TCreatableOptionType } from '@/components/SelectComponents/components/MenuList/models/menuList.model';
import type { GroupBase, OptionProps } from 'react-select';

type TCheckboxOption<T, IsMulti extends boolean = boolean> = OptionProps<
  TCreatableOptionType<T>,
  IsMulti,
  GroupBase<TCreatableOptionType<T>>
>;
export type { TCheckboxOption };
