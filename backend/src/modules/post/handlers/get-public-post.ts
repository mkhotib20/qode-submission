import { FastifyRequest } from 'fastify';

import { postRepo } from '../entities/post.entity';
import { GetHomepageRequest } from '../models/types';

const handleGetPublicPost = async (req: FastifyRequest<GetHomepageRequest>) => {
  const page = parseInt(req.query.page || '1', 10);
  const per_page = parseInt(req.query.per_page || '10', 10);

  const postData = await postRepo().find({
    take: per_page + 1,
    skip: (page - 1) * per_page,
    relations: ['author'],
    order: { created_at: 'DESC' },
  });

  const hasNext = postData.length > per_page;

  // For efficient pagination, instead of re-query to get count
  let finalResult = postData;
  if (hasNext) {
    finalResult = finalResult.slice(0, per_page);
  }

  return {
    result: finalResult,
    nextPage: hasNext ? page + 1 : null,
  };
};

export default handleGetPublicPost;
