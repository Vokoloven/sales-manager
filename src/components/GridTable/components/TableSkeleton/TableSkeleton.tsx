'use client';

import { useSyncExternalStore } from 'react';
import PaginationSkeleton from '../PaginationSkeleton/PaginationSkeleton';
import { TABLE_SKELETON } from './constants/tableSkeleton.constant';
import type { TTableSkeletonProps } from './models/TableSkeleton.model';
import styles from './TableSkeleton.module.css';

const subscribe = (cb: () => void) => {
  window.addEventListener('resize', cb);
  return () => {
    window.removeEventListener('resize', cb);
  };
};

const TableSkeleton = ({ columns = 4, rows, showPagination = false }: TTableSkeletonProps) => {
  const viewportRows = useSyncExternalStore(
    subscribe,
    () => Math.ceil(window.innerHeight / TABLE_SKELETON.rowHeight),
    () => 10
  );

  const rowCount = rows ?? viewportRows;
  const colCount = Math.min(columns, TABLE_SKELETON.headerWidth.length);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {Array.from({ length: colCount }).map((_, colIdx) => (
          <div key={colIdx} className={styles.headerCell}>
            <div
              className={styles.headerTitle}
              style={{ width: `${String(TABLE_SKELETON.headerWidth[colIdx])}%` }}
            />
            <div className={styles.headerFilter} />
          </div>
        ))}
      </div>

      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <div key={rowIdx} className={styles.row}>
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <div key={colIdx} className={styles.cell}>
              <div
                className={styles.cellBone}
                style={{
                  width: `${String(TABLE_SKELETON.bodyWidth[rowIdx % TABLE_SKELETON.bodyWidth.length][colIdx])}%`
                }}
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
