import type { TPrettify } from '@/core/models/utility.model';
import type { GroupBase, MenuListProps } from 'react-select';

type TCreatableOptionType<TOption> = TPrettify<
  { label: string; value: TOption } & { __isNew__?: boolean }
>;

type TMenuListProps<TOption, IsMulti extends boolean = false> = {
  menuClassname?: string;
} & MenuListProps<TCreatableOptionType<TOption>, IsMulti, GroupBase<TCreatableOptionType<TOption>>>;

export type { TCreatableOptionType, TMenuListProps };
