import type { CSSObjectWithLabel } from 'react-select';

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
  }),
  menu: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    backgroundColor: 'var(--background)'
  }),
  menuList: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    backgroundColor: 'var(--background)'
  }),
  option: (baseStyles: CSSObjectWithLabel, state: { isFocused: boolean; isSelected: boolean }) => ({
    ...baseStyles,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: state.isSelected
      ? 'var(--accent)'
      : state.isFocused
        ? 'var(--surface-hover)'
        : 'var(--background)',
    color: state.isSelected ? 'var(--background)' : 'var(--text-primary)',
    cursor: 'pointer'
  })
};

export { selectStyles };
