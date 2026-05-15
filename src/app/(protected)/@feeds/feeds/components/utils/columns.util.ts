import { createColumnHelper } from '@tanstack/react-table';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import type { TItem } from '../../models/feeds.schema';

const generateColumns = () => {
  const columnHelper = createColumnHelper<TItem>();

  return [
    columnHelper.accessor('title', {
      id: 'title',
      header: 'Title',
      cell: (info) => info.getValue(),
      minSize: 175,
      size: 175
    }),
    columnHelper.accessor('published', {
      id: 'published',
      header: 'Published',
      cell: (info) => info.getValue(),
      minSize: 175,
      size: 175,
      meta: {
        filterType: FILTER_TYPE.date
      }
    }),
    columnHelper.accessor('matchedCases', {
      id: 'matchedCases',
      header: 'Matched cases',
      cell: (info) => info.getValue(),
      minSize: 175,
      size: 175,
      enableColumnFilter: false
    }),
    columnHelper.accessor('matchedBlogs', {
      id: 'matchedBlogs',
      header: 'Matched blogs',
      cell: (info) => info.getValue(),
      minSize: 175,
      size: 175,
      enableColumnFilter: false
    })
  ];
};

export { generateColumns };
