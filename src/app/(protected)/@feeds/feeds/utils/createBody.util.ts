import type { TFeedsPageParsedSearchParams } from '../models/page.model';

const createBody = ({
  pageSize,
  pageNumber,
  sortDirection,
  sortBy,
  ...rest
}: TFeedsPageParsedSearchParams) => {
  const searchParameters = Object.keys(rest).length
    ? Object.entries(rest).map(([key, value]) => ({
        searchQuery: value,
        searchBy: key
      }))
    : undefined;

  return JSON.stringify({
    pageSize: Number(pageSize),
    pageNumber: Number(pageNumber),
    sortDirection,
    sortBy,
    searchParameters
  });
};

export { createBody };
