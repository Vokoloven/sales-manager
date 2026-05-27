import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import classNames from 'classnames';
import { DayPicker } from 'react-day-picker';
import Button from '@/components/Button/Button';
import { BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Input from '@/components/Input/Input';
import ButtonList from './components/ButtonList/ButtonList';
import { mixedDayPickerClassNames, PORTAL } from './constants/datePicker.constant';
import { useDatePicker } from './hooks/useDatePicker';
import { formatDisplayRange } from './utils/formatRange';
import type { TDatePicker } from './models/datePicker.model';
import styles from './DatePicker.module.css';
import '@/css/piker.css';

const DataPicker = ({ setFilterValue, filterValue, label }: TDatePicker) => {
  const {
    refs,
    isOpen,
    context,
    floatingStyles,
    minDate,
    range,
    today,
    getReferenceProps,
    onClear,
    setRange,
    getFloatingProps,
    handleSelect,
    setIsOpen
  } = useDatePicker({ setFilterValue });

  return (
    <>
      <div className={classNames('tableDataPickerInput', 'tableDataPicker', styles.box)}>
        <Input
          name={label}
          ref={(node) => {
            refs.setReference(node);
          }}
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
              ref={(node) => {
                refs.setFloating(node);
              }}
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
