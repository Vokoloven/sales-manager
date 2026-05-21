import type { TTableSkeletonProps } from './models/TableSkeleton.model';
import styles from './TableSkeleton.module.css';

const HEADER_WIDTHS = [42, 55, 52, 48];

const BODY_WIDTHS = [
  [72, 65, 80, 58],
  [55, 82, 70, 75],
  [68, 60, 55, 82],
  [80, 75, 65, 60],
  [60, 70, 78, 55],
  [75, 58, 68, 80],
  [65, 82, 60, 72],
  [82, 65, 75, 58],
  [70, 78, 58, 68],
  [58, 68, 82, 70]
];

const TableSkeleton = ({ columns = 4, rows = 10 }: TTableSkeletonProps) => {
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
    </div>
  );
};

export default TableSkeleton;
