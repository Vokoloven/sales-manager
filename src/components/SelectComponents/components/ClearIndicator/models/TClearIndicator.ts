import type { TCreatableOptionType } from '@/components/SelectComponents/components/MenuList/models/menuList.model';
import type { ClearIndicatorProps, GroupBase } from 'react-select';

type TClearIndicator<TOption, IsMulti extends boolean = boolean> = ClearIndicatorProps<
  TCreatableOptionType<TOption>,
  IsMulti,
  GroupBase<TCreatableOptionType<TOption>>
>;

export type { TClearIndicator };
