import { createColumnHelper } from '@tanstack/react-table';
import { FILTER_TYPE } from '@/components/GridTable/components/FilterCell/constnts/filterCell.constant';
import { KeywordBadges } from '../../Badges/KeywordBadge';
import { ScoreBadge } from '../../Badges/ScoreBadge';
import type { TGenerateColumns } from '../models/columns.model';
import type { TFeedItem } from '@/app/(protected)/@feeds/feeds/models/feeds.model';

const generateColumns = ({ data, keywordsParsedValue, scoreParsedValue }: TGenerateColumns) => {
  const columnHelper = createColumnHelper<TFeedItem>();

  return [
    columnHelper.accessor('title', {
      id: 'title',
      header: 'Title',
      cell: (info) => (
        <a href={info.row.original.url} target='_blank' rel='noopener noreferrer'>
          {info.getValue()}
        </a>
      ),
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
      cell: (info) => {
        const keywords = info.getValue();

        return keywords?.length ? <KeywordBadges keywords={keywords} /> : null;
      },
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
      cell: (info) => {
        const score = info.getValue();

        return score ? <ScoreBadge score={score} /> : null;
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
