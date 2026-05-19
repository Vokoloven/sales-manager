import MenuListCheckbox from './components/MenuListCheckbox/MenuListCheckbox';
import MenuListVirtual from './components/MenuListVirtual/MenuListVirtual';

const menuListMap = {
  Virtual: MenuListVirtual,
  Checkbox: MenuListCheckbox
} as const;

export default menuListMap;
