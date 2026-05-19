import { getOverflowAncestors } from '@floating-ui/react'; // используем ту же утилиту
import { type FC, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { selectStyles } from '@/components/GridTable/components/FilterCell/components/SelectFilter/constants/selectFilter.constant';
import { SELECT_COMPONENT_MAP } from '@/components/SelectComponents/selectComponentMap';
import type { TSelectFilter } from '@/components/GridTable/components/FilterCell/models/filterCell.model';
import type { TOption } from '@/core/models/option.model';

const SelectFilter: FC<TSelectFilter> = ({ setFilterValue, options, parsedValue = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSelected, setPendingSelected] = useState<TOption[]>([]);
  const [optimisticValues, setOptimisticValues] = useState<string[] | null>(null);

  const pendingSelectedRef = useRef(pendingSelected);
  const parsedValueRef = useRef(parsedValue);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pendingSelectedRef.current = pendingSelected;
  }, [pendingSelected]);

  useEffect(() => {
    parsedValueRef.current = parsedValue;
  }, [parsedValue]);

  const selectedFromParsed = useMemo(
    () => options.filter((opt) => parsedValue.includes(opt.value)),
    [options, parsedValue]
  );

  const displayValue = useMemo(() => {
    if (isOpen) return pendingSelected;
    if (optimisticValues !== null) {
      const isSynced =
        parsedValue.length === optimisticValues.length &&
        optimisticValues.every((v) => parsedValue.includes(v));
      if (!isSynced) return options.filter((opt) => optimisticValues.includes(opt.value));
    }
    return selectedFromParsed;
  }, [isOpen, pendingSelected, optimisticValues, parsedValue, options, selectedFromParsed]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    const newValues = pendingSelectedRef.current.map((opt) => opt.value);
    const prevValues = parsedValueRef.current;
    if (newValues.length === prevValues.length && newValues.every((v) => prevValues.includes(v))) {
      return;
    }
    setFilterValue(newValues);
  }, [setFilterValue]);

  const handleOpen = () => {
    const base =
      optimisticValues !== null
        ? options.filter((opt) => optimisticValues.includes(opt.value))
        : selectedFromParsed;
    setPendingSelected(base);
    setOptimisticValues(null);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen || !containerRef.current) return undefined;

    const ancestors = getOverflowAncestors(containerRef.current);

    const getScrollPos = (el: (typeof ancestors)[number]) => {
      if (el instanceof HTMLElement) {
        return { top: el.scrollTop, left: el.scrollLeft };
      }

      if (el instanceof Window) {
        return {
          top: el.scrollY || el.pageYOffset || 0,
          left: el.scrollX || el.pageXOffset || 0
        };
      }

      if (el instanceof VisualViewport) {
        return { top: el.offsetTop, left: el.offsetLeft };
      }

      return { top: 0, left: 0 };
    };

    const initialScrolls = ancestors.map((el) => ({
      el,
      ...getScrollPos(el)
    }));

    const handleScroll = () => {
      const isSignificantScroll = initialScrolls.some(({ el, top, left }) => {
        const current = getScrollPos(el);
        return Math.abs(current.top - top) > 10 || Math.abs(current.left - left) > 10;
      });

      if (isSignificantScroll) {
        handleClose();
      }
    };

    ancestors.forEach((ancestor) => {
      ancestor.addEventListener('resize', handleClose);
      ancestor.addEventListener('scroll', handleScroll, { passive: true });
    });

    return () => {
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener('resize', handleClose);
        ancestor.removeEventListener('scroll', handleScroll);
      });
    };
  }, [isOpen, handleClose]);

  return (
    <div ref={containerRef}>
      <Select<TOption, true>
        isMulti
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
    </div>
  );
};

export default SelectFilter;
