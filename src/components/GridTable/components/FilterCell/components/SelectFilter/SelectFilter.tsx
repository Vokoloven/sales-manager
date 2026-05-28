import Select from 'react-select';
import { selectStyles } from '@/components/GridTable/components/FilterCell/components/SelectFilter/constants/selectFilter.constant';
import { SELECT_COMPONENT_MAP } from '@/components/SelectComponents/selectComponentMap';
import { useSelectFilter } from './hooks/useSelectFilter';
import type { TSelectFilter } from '@/components/GridTable/components/FilterCell/models/filterCell.model';
import type { TOption } from '@/core/models/option.model';

const SelectFilter = ({ setFilterValue, label, options = [], parsedValue }: TSelectFilter) => {
  const {
    containerRef,
    displayValue,
    handleClose,
    handleOpen,
    isOpen,
    mounted,
    setIsOpen,
    setOptimisticValues,
    setPendingSelected
  } = useSelectFilter({ parsedValue, options, setFilterValue });

  return (
    <div ref={containerRef}>
      {mounted && (
        <Select<TOption, true>
          instanceId={label ? `Filter by ${label}` : 'Filter'}
          isMulti
          aria-label={label ? `Filter by ${label}` : 'Filter'}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          className='wrapper_react-select'
          classNamePrefix='react-select'
          components={{
            MenuList: (props) => <SELECT_COMPONENT_MAP.MenuListMap.Checkbox {...props} />,
            ValueContainer: SELECT_COMPONENT_MAP.ValueContainer,
            ClearIndicator: SELECT_COMPONENT_MAP.ClearIndicator
          }}
          styles={selectStyles}
          value={displayValue}
          isClearable={displayValue.length > 0}
          options={options}
          isSearchable={false}
          menuIsOpen={isOpen}
          onMenuOpen={handleOpen}
          onMenuClose={handleClose}
          onChange={(value, actionMeta) => {
            if (actionMeta.action === 'clear') {
              setOptimisticValues(null);
              setPendingSelected([]);
              setIsOpen(false);
              setFilterValue([]);
              return;
            }
            if (actionMeta.action === 'remove-value' && !isOpen) {
              const newValues = [...value].map((opt) => opt.value);
              setOptimisticValues(newValues);
              setFilterValue(newValues);
              return;
            }
            setPendingSelected([...value]);
          }}
          placeholder=''
        />
      )}
    </div>
  );
};

export default SelectFilter;
