import { isValidElement, type ReactElement, type ReactNode } from 'react';
import type { TCreatableOptionType } from '../models/menuList.model';
import type { OptionProps } from 'react-select';

const isOptionElement = <TOption>(
  child: ReactNode
): child is ReactElement<OptionProps<TCreatableOptionType<TOption>>> => {
  return isValidElement(child);
};

export { isOptionElement };
