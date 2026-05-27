import type { TButtonList } from '../models/buttonList.model';

const useButtonList = ({ setFilterValue, setIsOpen, setRange }: TButtonList) => {
  const applyRange = (from: Date, to: Date) => {
    const end = new Date(to);
    end.setDate(end.getDate() + 1);

    setRange({ from, to });

    setFilterValue(`${from.toISOString()} - ${end.toISOString()}`);
    setIsOpen(false);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const lastWeek = new Date(now);
  lastWeek.setDate(now.getDate() - 6);

  return { applyRange, now, yesterday, lastWeek } as const;
};

export { useButtonList };
