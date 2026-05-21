import MenuListCheckbox from './components/MenuListCheckbox/MenuListCheckbox';
import MenuListVirtual from './components/MenuListVirtual/MenuListVirtual';

const MENU_LIST_MAP = {
  Virtual: MenuListVirtual,
  Checkbox: MenuListCheckbox
} as const;

export { MENU_LIST_MAP };
