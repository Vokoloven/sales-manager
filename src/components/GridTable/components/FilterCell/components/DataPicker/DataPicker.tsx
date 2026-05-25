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
import { useEffect, useMemo, useState } from 'react';
import { type DateRange, DayPicker } from 'react-day-picker';
import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Input from '@/components/Input/Input';
import ButtonList from './components/ButtonList/ButtonList';
import { mixedDayPickerClassNames, PORTAL } from './constants/dataPicker.constant';
import { formatDisplayRange } from './utils/formatRange';
import type { TDatePicker } from './models/DataPicker.model';
import styles from './DataPicker.module.css';
import '@/css/piker.css';

const DataPicker = ({ setFilterValue, filterValue, label }: TDatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const middleware = useMemo(() => [offset(8), flip(), shift({ padding: 8 })], []);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const minDate = useMemo(() => new Date(0), []);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    middleware,
    whileElementsMounted: autoUpdate
  });
  const [range, setRange] = useState<DateRange | undefined>();
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRange(undefined);
      }
    }
  }, [isOpen, range]);

  return (
    <>
      <div className={classNames('tableDataPickerInput', 'tableDataPicker', styles.box)}>
        <Input
          name={label}
          ref={refs.setReference}
          {...getReferenceProps()}
          readOnly={true}
          value={formatDisplayRange(filterValue)}
          aria-label={label ? `Filter ${label} by date range` : 'Filter date range'}
        />
        {filterValue ? (
          <Button
            buttonType={BUTTON_TYPE.iconGhost}
            icon={<Icons.FilterClear />}
            type='button'
            onClick={onClear}
          />
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
              // eslint-disable-next-line react-hooks/refs
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
