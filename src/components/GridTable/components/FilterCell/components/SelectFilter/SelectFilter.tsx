import { getOverflowAncestors } from '@floating-ui/react'; // используем ту же утилиту
import { type FC, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import {
  selectComponents,
  selectStyles
} from '@/components/GridTable/components/FilterCell/components/SelectFilter/constants/selectFilter.constant';
import type { TSelectFilter } from '@/components/GridTable/components/FilterCell/models/filterCell.model';
import type { TOption } from '@/core/models/option.model';

const SelectFilter: FC<TSelectFilter> = ({ filterValue, setFilterValue, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
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
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      <Select<TOption>
        className='wrapper_react-select'
        classNamePrefix='react-select'
        components={selectComponents}
        styles={selectStyles}
        isClearable={!!filterValue}
        options={options}
        isSearchable={false}
        menuIsOpen={isOpen}
        onMenuOpen={() => {
          setIsOpen(true);
        }}
        onMenuClose={handleClose}
        onChange={(value, actionMeta) => {
          if (actionMeta.action === 'clear') {
            handleClose();
          }
          setFilterValue(value?.value ?? '');
        }}
        placeholder=''
      />
    </div>
  );
};

export default SelectFilter;
