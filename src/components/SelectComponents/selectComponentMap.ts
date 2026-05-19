import ClearIndicator from './components/ClearIndicator/ClearIndicator';
import { MENU_LIST_MAP } from './components/MenuList/menuListMap';
import Placeholder from './components/Placeholder/Placeholder';
import ValueContainer from './components/ValueContainer/ValueContainer';

const SELECT_COMPONENT_MAP = {
  MenuListMap: MENU_LIST_MAP,
  ValueContainer: ValueContainer,
  Placeholder: Placeholder,
  ClearIndicator: ClearIndicator
} as const;

export { SELECT_COMPONENT_MAP };
