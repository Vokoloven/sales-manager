const PAGE_WINDOW = 6;

const PAGE_SIZE = {
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50'
} as const;

const INIT_PAGINATION = { pageSize: PAGE_SIZE['10'], pageNumber: 1 };

const PAGE_SIZE_OPTION = Object.values(PAGE_SIZE).map((value) => ({ label: value, value }));

export { PAGE_WINDOW, PAGE_SIZE, INIT_PAGINATION, PAGE_SIZE_OPTION };
