import { Icons } from '@/components/Icons/Icons';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import type { TKey } from '@/core/models/utility.model';

const NAV_BUTTONS = Object.values(APP_PROTECTED_PATH).map((value) => {
  const formatTitle = (path: string) =>
    path
      .split('/')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const formattedValue = formatTitle(value);

  const Icon = Icons[formattedValue as TKey<typeof Icons>];

  return {
    id: value,
    name: formattedValue,
    icon: Icon ? <Icon /> : null
  };
});

export { NAV_BUTTONS };
