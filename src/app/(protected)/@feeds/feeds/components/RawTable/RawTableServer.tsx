import { feedsService } from '../../service/Feeds.service';
import { PAGE_SIZE_OPTION } from '../Pagination/constants/pagination.constant';
import Pagination from '../Pagination/Pagination';
import RawTable from './RawTable';
import type { TFeedsPageParsedSearchParams } from '../../models/page.model';

const RawTableServer = async (props: TFeedsPageParsedSearchParams) => {
  const data = await feedsService.getFeeds(props);
  const totalPages = data.success ? data.data.items.totalPages : 1;

  return (
    <>
      <RawTable data={data} parsedSearchParams={props} />
      <Pagination options={PAGE_SIZE_OPTION} totalPages={totalPages} parsedSearchParams={props} />
    </>
  );
};

export default RawTableServer;
