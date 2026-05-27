import {
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
import { startTransition, useEffect, useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import type { TDatePicker } from '../models/datePicker.model';

const useDatePicker = ({ setFilterValue }: Pick<TDatePicker, 'setFilterValue'>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

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
  }, [isOpen, refs]);

  useEffect(() => {
    if (!isOpen) {
      if (range?.from && !range.to) {
        startTransition(() => {
          setRange(undefined);
        });
      }
    }
  }, [isOpen, range]);

  return {
    refs,
    isOpen,
    context,
    floatingStyles,
    today,
    minDate,
    range,
    getReferenceProps,
    onClear,
    getFloatingProps,
    handleSelect,
    setRange,
    setIsOpen
  } as const;
};

export { useDatePicker };
