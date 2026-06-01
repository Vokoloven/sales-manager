import { flexRender } from '@tanstack/react-table';
import classnames from 'classnames';
import { useRef } from 'react';
import { useScrollPinnedBoundaries } from '@/components/GridTable/hooks/useScrollPinnedBoundaries';
import { pinnedColumnMeta } from '@/components/GridTable/utils/pinnedColumnMeta';
import Button from '../Button/Button';
import { BUTTON_TYPE } from '../Button/constants/button.constant';
import { Icons } from '../Icons/Icons';
import FilterCell from './components/FilterCell/FilterCell';
import Resizer from './components/Resizer/Resizer';
import { useGridTable } from './hooks/useGridTable';
import type { Table } from '@tanstack/react-table';
import styles from './GridTable.module.css';
import '@/css/table-style.css';

const GridTable = <T,>({ table }: { table: Table<T> }) => {
  const {
    tableContainerRef,
    onRowClick,
    virtualItems,
    paddingTop,
    paddingBottom,
    rowVirtualizer,
    isFiltered,
    rows
  } = useGridTable(table);

  const { hasContentBehindOfPinned } = useScrollPinnedBoundaries(tableContainerRef);
  const mouseCoords = useRef({ x: 0, y: 0 });

  return (
    <div className={styles['table-grid']}>
      <div
        ref={tableContainerRef}
        style={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          overflow: 'auto'
        }}
      >
        <table className='gridTable' style={{ display: 'grid' }}>
          <thead
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 2
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr
                  key={headerGroup.id}
                  style={{ display: 'flex', width: '100%' }}
                  className={classnames({
                    [styles['filter-row']]: headerGroup.headers.some((header) =>
                      header.column.getCanFilter()
                    )
                  })}
                >
                  {headerGroup.headers.map((header) => {
                    const { pinnedDirection, pinnedOffset, isLeftPinned, isRightPinned } =
                      pinnedColumnMeta(header.column, table);

                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        data-pinned-right={isRightPinned && hasContentBehindOfPinned}
                        data-pinned-left={isLeftPinned && hasContentBehindOfPinned}
                        style={{
                          width: header.getSize(),
                          ...(pinnedDirection && {
                            position: 'sticky',
                            zIndex: 3,
                            ...(pinnedDirection === 'left' && { left: pinnedOffset }),
                            ...(pinnedDirection === 'right' && { right: pinnedOffset })
                          })
                        }}
                      >
                        <div style={{ width: '100%' }}>
                          {header.column.getCanSort() ? (
                            <div
                              {...{
                                className: classnames({
                                  [styles.sorting]: header.column.getCanSort()
                                }),
                                onClick: header.column.getToggleSortingHandler()
                              }}
                            >
                              <span className={styles.title}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </span>
                              {(header.column.getCanSort() &&
                                {
                                  asc: (
                                    <Button
                                      icon={<Icons.ArrowUp />}
                                      buttonType={BUTTON_TYPE.iconGhost}
                                      aria-label='Sort ascending'
                                    />
                                  ),
                                  desc: (
                                    <Button
                                      icon={<Icons.ArrowDown />}
                                      buttonType={BUTTON_TYPE.iconGhost}
                                      aria-label='Sort descending'
                                    />
                                  )
                                }[header.column.getIsSorted() as string]) ?? (
                                <Button
                                  icon={<Icons.Sortable />}
                                  buttonType={BUTTON_TYPE.iconGhost}
                                  aria-label='Toggle sort'
                                />
                              )}
                            </div>
                          ) : (
                            <span className={styles.title}>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                          )}
                          {header.column.getCanResize() && (
                            <Resizer
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              isResizing={header.column.getIsResizing()}
                            />
                          )}
                          {header.column.getCanFilter() && (
                            <div
                              className={classnames('TableFilterWrapper', styles['filter-wrapper'])}
                            >
                              <FilterCell column={header.column} table={table} />
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          {Boolean(virtualItems.length) && (
            <tbody
              style={{
                display: 'grid',
                minHeight: `${String(rowVirtualizer.getTotalSize())}px`,
                position: 'relative',
                zIndex: 1,
                paddingTop: `${String(paddingTop)}px`,
                paddingBottom: `${String(paddingBottom)}px`
              }}
            >
              {virtualItems.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <tr
                    data-index={virtualRow.index}
                    ref={(node) => {
                      if (node) {
                        rowVirtualizer.measureElement(node);
                      }
                    }}
                    key={row.id}
                    className={classnames({
                      [styles['sub-row']]: row.depth > 0,
                      [styles.expanded]: row.getIsExpanded()
                    })}
                    style={{
                      display: 'flex',
                      width: '100%',
                      minHeight: '36px',
                      boxSizing: 'border-box'
                    }}
                    onMouseDown={(e) => {
                      mouseCoords.current = { x: e.clientX, y: e.clientY };
                    }}
                    onMouseUp={(e) => {
                      const target = e.target as Element;

                      if (
                        target.closest(
                          'button, a, input, select, div#portal-modal, div[data-floating-ui-portal]'
                        )
                      ) {
                        return;
                      }

                      const deltaX = Math.abs(e.clientX - mouseCoords.current.x);
                      const deltaY = Math.abs(e.clientY - mouseCoords.current.y);

                      if (deltaX > 5 || deltaY > 5) {
                        return;
                      }

                      onRowClick?.(row.original, virtualRow.index, e);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { pinnedDirection, pinnedOffset, isLeftPinned, isRightPinned } =
                        pinnedColumnMeta(cell.column, table);
                      return (
                        <td
                          data-pinned-right={isRightPinned && hasContentBehindOfPinned}
                          data-pinned-left={isLeftPinned && hasContentBehindOfPinned}
                          key={cell.id}
                          className={classnames({
                            [styles['wrap-cell']]: cell.column.columnDef.meta?.wrap
                          })}
                          style={{
                            width: cell.column.getSize(),
                            ...(pinnedDirection && {
                              position: 'sticky',
                              zIndex: 3,
                              ...(pinnedDirection === 'left' && { left: pinnedOffset }),
                              ...(pinnedDirection === 'right' && { right: pinnedOffset })
                            })
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {!virtualItems.length && (
          <p className={styles['no-result']}>
            {isFiltered ? 'No results found for your search query' : 'No items'}
          </p>
        )}
      </div>
    </div>
  );
};

export default GridTable;
