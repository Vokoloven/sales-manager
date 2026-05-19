import type { TCreatableOptionType } from '../../MenuList/models/menuList.model';
import type { GroupBase, PlaceholderProps } from 'react-select';

type TPlaceholderProps<TOption, IsMulti extends boolean = boolean> = {
  label?: string;
  required?: boolean;
} & PlaceholderProps<
  TCreatableOptionType<TOption>,
  IsMulti,
  GroupBase<TCreatableOptionType<TOption>>
>;

export type { TPlaceholderProps };
