/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useFloating,
  useInteractions,
  offset,
  flip,
  shift,
  useDismiss,
  autoUpdate,
  getOverflowAncestors
} from '@floating-ui/react';
import classNames from 'classnames';
import { type FC, useEffect, useState } from 'react';
import { type DateRange, DayPicker } from 'react-day-picker';
import { Icons } from '@/components/Icons/Icons';
import ButtonList from './components/ButtonList/ButtonList';
import { mixedDayPickerClassNames, PORTAL } from './constants/dataPicker.constant';
import { formatDisplayRange } from './utils/formatRange';
import type { TDatePicker } from './models/DataPicker.model';
import styles from './DataPicker.module.css';

const DataPicker: FC<TDatePicker> = ({ setFilterValue, filterValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate
  });
  const [range, setRange] = useState<DateRange | undefined>();
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(0);

  const handleSelect = (newRange: DateRange | undefined, selectedDay: Date) => {
    if (range?.from && range?.to) {
      setRange({ from: selectedDay, to: undefined });
      return;
    }

    if (!range?.from) {
      setRange({ from: selectedDay, to: undefined });
      return;
    }

    setRange(newRange);

    if (newRange?.from && newRange.to) {
      const newEndDate = new Date(newRange.to);
      newEndDate.setDate(newEndDate.getDate() + 1);

      const from = newRange.from.toISOString();
      const to = newEndDate.toISOString();

      setFilterValue(`${from} - ${to}`);
      setIsOpen(false);
    }
  };

  const onClear = () => {
    setFilterValue('');
    setRange(undefined);
  };

  useEffect(() => {
    if (!isOpen || !refs.reference.current) {
      return undefined;
    }

    const ancestors = getOverflowAncestors(refs.reference.current as HTMLElement);

    const handleClose = () => {
      setIsOpen(false);
    };

    ancestors.forEach((ancestor) => {
      ancestor.addEventListener('resize', handleClose);
      ancestor.addEventListener('scroll', handleClose, { passive: true });
    });

    return () => {
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener('resize', handleClose);
        ancestor.removeEventListener('scroll', handleClose);
      });
    };
  }, [isOpen, refs.reference]);

  useEffect(() => {
    if (!isOpen) {
      if (range?.from && !range.to) {
        setRange(undefined);
      }
    }
  }, [isOpen, range]);

  return (
    <>
      <div className={classNames('tableDataPicker', styles.box, styles.dataPicker)}>
        <input
          ref={refs.setReference}
          {...getReferenceProps()}
          readOnly={true}
          className={classNames('tableDataPickerInput', styles.input, { focus: isOpen })}
          value={formatDisplayRange(filterValue)}
        />
        {filterValue ? (
          <button type='button' onClick={onClear} className={styles.clearButton}>
            <Icons.FilterClear />
          </button>
        ) : (
          <span className={styles.calendarIcon}>
            <Icons.CalendarDate />
          </span>
        )}
      </div>

      {isOpen && (
        <FloatingPortal root={PORTAL.root} id={PORTAL.datePicker}>
          <FloatingFocusManager context={context} modal>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles }}
              className={styles.dataPickContainer}
              {...getFloatingProps()}
            >
              <DayPicker
                classNames={mixedDayPickerClassNames}
                disabled={{ after: today, before: minDate }}
                navLayout='around'
                mode='range'
                selected={range}
                onSelect={handleSelect}
                footer={
                  <ButtonList
                    setRange={setRange}
                    setFilterValue={setFilterValue}
                    setIsOpen={setIsOpen}
                  />
                }
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export default DataPicker;
