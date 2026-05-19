import type { TCreatableOptionType } from '../../MenuList/models/menuList.model';
import type { GroupBase, ValueContainerProps } from 'react-select';

type TValueContainer<T, IsMulti extends boolean = boolean> = ValueContainerProps<
  TCreatableOptionType<T>,
  IsMulti,
  GroupBase<TCreatableOptionType<T>>
>;

export type { TValueContainer };
