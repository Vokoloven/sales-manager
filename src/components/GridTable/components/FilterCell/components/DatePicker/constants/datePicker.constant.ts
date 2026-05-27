import classNames from 'classnames';
import dayPickerStyles from 'react-day-picker/src/style.module.css';
import styles from '../DatePicker.module.css';

const PORTAL = {
  get root() {
    return typeof document !== 'undefined' ? document.querySelector('body') : null;
  },
  datePicker: 'date-picker'
} as const;

const mixedDayPickerClassNames = {
  ...dayPickerStyles,
  root: classNames(dayPickerStyles.root, styles.root, 'day_piker_root'),
  months: classNames(dayPickerStyles.months, styles.months, 'day_piker_months'),
  day_button: classNames(dayPickerStyles.day_button, styles.dayButton, 'day_piker_day_button'),
  disabled: classNames(dayPickerStyles.disabled, styles.disabled, 'disabled'),
  range_middle: classNames(dayPickerStyles.range_middle, styles.range, 'day_piker_range'),
  range_start: classNames(dayPickerStyles.range_start, styles.rangeStart, 'day_piker_range_start'),
  range_end: classNames(dayPickerStyles.range_end, styles.rangeEnd, 'day_piker_range_end'),
  button_next: classNames(dayPickerStyles.button_next, styles.button, 'day_piker_button'),
  button_previous: classNames(dayPickerStyles.button_previous, styles.button, 'day_piker_button'),
  today: classNames(dayPickerStyles.today, styles.today, 'day_piker_today'),
  selected: classNames(dayPickerStyles.selected, styles.selected, 'day_piker_selected')
};

export { mixedDayPickerClassNames, PORTAL };
