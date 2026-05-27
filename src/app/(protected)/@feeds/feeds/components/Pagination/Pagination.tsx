'use client';

import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useSyncExternalStore } from 'react';
import Select from 'react-select';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { selectStyles } from '@/components/GridTable/components/FilterCell/components/SelectFilter/constants/selectFilter.constant';
import PaginationSkeleton from '@/components/GridTable/components/PaginationSkeleton/PaginationSkeleton';
import { Icons } from '@/components/Icons/Icons';
import { SELECT_COMPONENT_MAP } from '@/components/SelectComponents/selectComponentMap';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { useFeedsTransition } from '../../context/hooks/useFeedsTransitions';
import { PAGE_WINDOW } from './constants/pagination.constant';
import type { PAGE_SIZE_OPTION } from './constants/pagination.constant';
import type { TFeedsPageProps } from '../../models/feeds.model';
import type { TOption } from '@/core/models/option.model';
import styles from './Pagination.module.css';

const subscribe = (_cb: () => void) => () => undefined;

const Pagination = ({
  options,
  parsedSearchParams,
  sp,
  totalPages
}: {
  options: typeof PAGE_SIZE_OPTION;
  sp?: string;
  totalPages: number;
} & Pick<TFeedsPageProps, 'parsedSearchParams'>) => {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const router = useRouter();
  const { isPending, startTransition } = useFeedsTransition();
  const currentPage = Number(parsedSearchParams.pageNumber);

  const { searchParameters: _, ...urlParams } = parsedSearchParams;

  const navigate = (pageNumber: number) => {
    startTransition(() => {
      router.push(
        `${APP_PROTECTED_PATH.feeds}?${qs.stringify({ ...urlParams, pageNumber, sp }, { skipNulls: true })}`
      );
    });
  };

  const windowStart = Math.max(1, Math.min(currentPage - 2, totalPages - PAGE_WINDOW + 1));
  const windowEnd = Math.min(totalPages, windowStart + PAGE_WINDOW - 1);
  const pages = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

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
              onChange={(newValue) => {
                startTransition(() => {
                  router.push(
                    `${APP_PROTECTED_PATH.feeds}?${qs.stringify(
                      { ...urlParams, pageNumber: 1, pageSize: newValue?.value, sp },
                      { skipNulls: true }
                    )}`
                  );
                });
              }}
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
