import { useFilterCell } from './hooks/useFilterCell';
import type { TFilterCellProps } from './models/filterCell.model';

const FilterCell = <C, T>(props: TFilterCellProps<C, T>) => {
  const { filter } = useFilterCell(props);

  return filter;
};

export default FilterCell;
