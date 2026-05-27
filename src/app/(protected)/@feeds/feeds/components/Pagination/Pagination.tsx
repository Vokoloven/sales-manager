'use client';

import Select from 'react-select';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { selectStyles } from '@/components/GridTable/components/FilterCell/components/SelectFilter/constants/selectFilter.constant';
import PaginationSkeleton from '@/components/GridTable/components/PaginationSkeleton/PaginationSkeleton';
import { Icons } from '@/components/Icons/Icons';
import { SELECT_COMPONENT_MAP } from '@/components/SelectComponents/selectComponentMap';
import { usePagination } from './hooks/usePagination';
import type { TPaginationProps } from './models/pagination.model';
import type { TOption } from '@/core/models/option.model';
import styles from './Pagination.module.css';

const Pagination = ({ options, parsedSearchParams, sp, totalPages }: TPaginationProps) => {
  const { isFirst, isLast, isPending, mounted, pages, currentPage, navigate, selectNavigate } =
    usePagination({
      parsedSearchParams,
      totalPages,
      sp
    });

  if (isPending) {
    return <PaginationSkeleton />;
  }

  return (
    <nav className={styles.pagination}>
      <div className={styles.info}>
        <span className={styles.infoText}>
          Items shown: <b>1-{parsedSearchParams.pageSize}</b> out of{' '}
          <b title={totalPages.toString()}>{totalPages}</b>
        </span>
        <div className={styles.pageSizeSelector}>
          <span className={styles.pageSizeLabel}>Items per page:</span>
          {mounted && (
            <Select<TOption>
              instanceId='pagination-page-size'
              aria-label='Items per page'
              hideSelectedOptions={false}
              closeMenuOnSelect={true}
              className='wrapper_react-select'
              classNamePrefix='react-select'
              components={{
                MenuList: (props) => <SELECT_COMPONENT_MAP.MenuListMap.Virtual {...props} />,
                ValueContainer: SELECT_COMPONENT_MAP.ValueContainer
              }}
              styles={selectStyles}
              menuPlacement='auto'
              options={options}
              defaultValue={{
                label: parsedSearchParams.pageSize,
                value: parsedSearchParams.pageSize
              }}
              isSearchable={false}
              onChange={selectNavigate}
              placeholder=''
            />
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.prevButtons}>
          <Button
            buttonType={BUTTON_TYPE.icon}
            size={BUTTON_SIZE.sm}
            icon={<Icons.First />}
            disabled={isFirst}
            onClick={() => {
              navigate(1);
            }}
            aria-label='First page'
          />
          <Button
            buttonType={BUTTON_TYPE.icon}
            size={BUTTON_SIZE.sm}
            icon={<Icons.ChevronLeft />}
            disabled={isFirst}
            onClick={() => {
              navigate(currentPage - 1);
            }}
            aria-label='Previous page'
          />
        </div>
        <div className={styles.pageButtons}>
          {pages.map((page) => (
            <Button
              key={page}
              buttonType={page === currentPage ? BUTTON_TYPE.iconAccent : BUTTON_TYPE.icon}
              size={BUTTON_SIZE.sm}
              text={String(page)}
              onClick={() => {
                navigate(page);
              }}
              aria-label={`Page ${String(page)}`}
              aria-current={page === currentPage ? 'page' : undefined}
            />
          ))}
        </div>
        <div className={styles.nextButtons}>
          <Button
            buttonType={BUTTON_TYPE.icon}
            size={BUTTON_SIZE.sm}
            icon={
              <span className={styles.flipped}>
                <Icons.ChevronLeft />
              </span>
            }
            disabled={isLast}
            onClick={() => {
              navigate(currentPage + 1);
            }}
            aria-label='Next page'
          />
          <Button
            buttonType={BUTTON_TYPE.icon}
            size={BUTTON_SIZE.sm}
            icon={
              <span className={styles.flipped}>
                <Icons.First />
              </span>
            }
            disabled={isLast}
            onClick={() => {
              navigate(totalPages);
            }}
            aria-label='Last page'
          />
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
