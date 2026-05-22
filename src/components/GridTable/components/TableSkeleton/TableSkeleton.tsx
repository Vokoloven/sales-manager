import PaginationSkeleton from '../PaginationSkeleton/PaginationSkeleton';
import { BODY_WIDTHS, HEADER_WIDTHS } from './constants/tableSkeleton.constant';
import type { TTableSkeletonProps } from './models/TableSkeleton.model';
import styles from './TableSkeleton.module.css';

const TableSkeleton = ({ columns = 4, rows = 10, showPagination = false }: TTableSkeletonProps) => {
  const colCount = Math.min(columns, HEADER_WIDTHS.length);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {Array.from({ length: colCount }).map((_, colIdx) => (
          <div key={colIdx} className={styles.headerCell}>
            <div
              className={styles.headerTitle}
              style={{ width: `${String(HEADER_WIDTHS[colIdx])}%` }}
            />
            <div className={styles.headerFilter} />
          </div>
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className={styles.row}>
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <div key={colIdx} className={styles.cell}>
              <div
                className={styles.cellBone}
                style={{ width: `${String(BODY_WIDTHS[rowIdx % BODY_WIDTHS.length][colIdx])}%` }}
              />
            </div>
          ))}
        </div>
      ))}

      {showPagination && <PaginationSkeleton />}
    </div>
  );
};

export default TableSkeleton;
