import { components } from 'react-select';
import { Icons } from '@/components/Icons/Icons';
import { typedMemo } from '@/core/utils/typedMemo.util';
import type { TClearIndicator } from './models/TClearIndicator';

const ClearIndicator = <T,>(props: TClearIndicator<T>) => (
  <components.ClearIndicator {...props}>
    <Icons.FilterClear />
  </components.ClearIndicator>
);

export default typedMemo(ClearIndicator);
