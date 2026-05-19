import type { TOption } from '../models/selectComponent.model';
import type { GroupBase, StylesConfig } from 'react-select';

const BASE_SELECT_STYLES: StylesConfig<TOption, boolean, GroupBase<TOption>> = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 999
  }),

  indicatorSeparator: () => ({
    display: 'none'
  }),

  singleValue: (base) => ({
    ...base,
    maxWidth: '85%'
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    position: 'relative',
    top: 'auto',
    right: 'auto',
    display: 'flex',
    color: state.isDisabled ? 'var(--neutral-400)' : 'currentColor',
    height: 20,
    margin: 0,
    padding: 0,
    width: 20,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',

    '> svg': {
      display: 'block',
      width: 20,
      height: 20,
      padding: 0,
      margin: 0
    }
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
    color: 'var(--neutral-600)'
  }),
  indicatorsContainer: (base) => ({
    ...base,
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 2,
    height: 20,
    justifyContent: 'flex-end'
  }),
  clearIndicator: (base) => ({
    ...base,
    width: 20,
    height: 20,
    padding: 0,
    margin: 0,
    color: 'var(--neutral-450)',
    cursor: 'pointer',
    '> svg': {
      width: 20,
      height: 20
    }
  }),

  control: (base) => ({
    ...base,
    minHeight: 48,
    height: 'auto',
    padding: '5px 4px',
    border: '1px solid var(--border-color)',
    boxShadow: 'none',
    gap: 8,

    '&:hover': {
      borderColor: 'var(--border-color)'
    },
    '&:focus-within': {
      boxShadow: '0 0 0 2px var(--color-fill-alert-neutral)'
    }
  }),

  valueContainer: (base) => ({
    ...base,
    padding: 0,
    minHeight: 20,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '4px'
  }),

  multiValue: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    lineHeight: '20px',
    width: 'auto',
    maxWidth: '100%',

    '> div': {
      padding: '1px 5px',
      lineHeight: '20px'
    }
  }),

  multiValueRemove: (base) => ({
    ...base,
    width: 22,
    margin: 0,
    height: 22,
    '&[role="button"]': {
      padding: 3
    },
    '> svg': {
      display: 'block',
      width: 16,
      height: 16,
      padding: 0,
      margin: 0
    }
  }),

  loadingIndicator: (base) => ({
    ...base,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 2,
    width: 20,
    height: 20,
    padding: 3,
    margin: '0 !important',
    '> span': {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--neutral-450)'
    }
  }),
  option: (base, state) => {
    const { isDisabled, isSelected } = state;

    return {
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      minHeight: '36px',

      backgroundColor: isDisabled
        ? 'var(--neutral-300)'
        : isSelected
          ? 'var(--cta-blue-100)'
          : 'var(--neutral-100)',

      color: isDisabled
        ? 'var(--neutral-300)'
        : isSelected
          ? 'var(--color-primary)'
          : 'var(--neutral-600)',

      cursor: isDisabled ? 'not-allowed' : 'pointer',

      '&:hover': {
        backgroundColor: isDisabled ? 'var(--neutral-300)' : 'var(--cta-blue-100)'
      }
    };
  }
} as const;

export { BASE_SELECT_STYLES };
