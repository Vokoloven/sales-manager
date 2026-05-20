import { createColumnHelper } from '@tanstack/react-table';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import type { TFeedItem, TFeedsPageProps } from '../../models/feeds.model';

const generateColumns = ({
  data,
  scoreParsedValue
}: Pick<TFeedsPageProps, 'data'> & { scoreParsedValue: string[] }) => {
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
        parsedValue: scoreParsedValue,
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
