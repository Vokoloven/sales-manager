import { createColumnHelper } from '@tanstack/react-table';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import { KeywordBadges } from '../Badges/KeywordBadge';
import { ScoreBadge } from '../Badges/ScoreBadge';
import type { TFeedItem, TFeedsPageProps } from '../../models/feeds.model';

const generateColumns = ({
  data,
  keywordsParsedValue,
  scoreParsedValue
}: Pick<TFeedsPageProps, 'data'> & {
  scoreParsedValue: string[];
  keywordsParsedValue: string[];
}) => {
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
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      minSize: 175,
      size: 175,
      meta: {
        filterType: FILTER_TYPE.date
      }
    }),

    columnHelper.accessor('keywords', {
      id: 'keywords',
      header: 'Keywords',
      cell: (info) => <KeywordBadges keywords={info.getValue()} />,
      minSize: 175,
      size: 175,
      meta: {
        parsedValue: keywordsParsedValue,
        options: data.data?.keywordsOptions.slice(0, 100),
        filterType: FILTER_TYPE.select,
        wrap: true
      }
    }),

    columnHelper.accessor('score', {
      id: 'score',
      header: 'Score',
      cell: (info) => <ScoreBadge score={info.getValue()} />,
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
