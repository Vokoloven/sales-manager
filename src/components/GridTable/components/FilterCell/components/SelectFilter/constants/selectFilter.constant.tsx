import { components, type CSSObjectWithLabel, type ClearIndicatorProps } from 'react-select';
import { Icons } from '@/components/Icons/Icons';
import type { TOption } from '@/core/models/option.model';

const ClearIndicator = (props: ClearIndicatorProps<TOption>) => (
  <components.ClearIndicator {...props}>
    <Icons.FilterClear />
  </components.ClearIndicator>
);

const selectStyles = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    height: '32px',
    minHeight: '32px'
  }),
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    height: '32px'
  }),
  clearIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: 0,
    height: '20px',
    width: '20px',
    minHeight: '20px',
    cursor: 'pointer'
  }),
  dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '2px 4px 2px 2px',
    cursor: 'pointer'
  })
} as const;

const selectComponents = {
  IndicatorSeparator: () => null,
  ClearIndicator
};

export { selectStyles, selectComponents };
