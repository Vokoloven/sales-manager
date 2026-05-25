import { feedService } from './services/Feed.service';
import type { TParams } from '@/core/models/params.model';

const ViewFeed = async ({ params }: TParams<'id'>) => {
  const { id } = await params;

  const _data = await feedService.getFeed(id);

  return <h1>ViewFeed is created on {id}</h1>;
};

export default ViewFeed;
