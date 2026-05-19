import { createColumnHelper } from '@tanstack/react-table';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import type { TFeedItem } from '../../models/feeds.model';
import type { TUseRawTable } from '../hooks/models/useRawTable.model';

const generateColumns = ({ data, parsedSearchParams }: TUseRawTable) => {
  const columnHelper = createColumnHelper<TFeedItem>();

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
    columnHelper.accessor('score', {
      id: 'score',
      header: 'Score',
      cell: (info) => {
        return info.getValue();
      },
      minSize: 175,
      size: 175,
      meta: {
        parsedValue:
          parsedSearchParams.searchParameters
            ?.filter(({ searchBy }) => searchBy === 'score')
            .map(({ searchQuery }) => searchQuery) ?? [],
        options: data.data?.scoreOptions,
        filterType: FILTER_TYPE.select
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
