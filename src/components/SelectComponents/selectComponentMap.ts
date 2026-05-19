import ClearIndicator from './components/ClearIndicator/ClearIndicator';
import menuListMap from './components/MenuList/menuListMap';
import Placeholder from './components/Placeholder/Placeholder';
import ValueContainer from './components/ValueContainer/ValueContainer';

const selectComponentMap = {
  menuListMap: menuListMap,
  ValueContainer: ValueContainer,
  Placeholder: Placeholder,
  ClearIndicator: ClearIndicator
} as const;

export default selectComponentMap;
