import { FastifyRequest } from 'fastify';

import { User } from '@/modules/user/entities/user.entity';

import { commentRepo } from '../entities/comment.entity';

const handleGetComments = async (
  req: FastifyRequest<{
    Params: { id: string };
    Querystring: { page: string; per_page: string };
  }>,
) => {
  const postID = req.params.id;
  const page = parseInt(req.query.page || '1', 10);
  const per_page = parseInt(req.query.per_page || '10', 10);

  const limit = per_page + 1;
  const offset = (page - 1) * per_page;

  const commentsData = await commentRepo()
    .createQueryBuilder('comment')
    .select(
      'comment.id, comment.comment, comment.created_at, author.full_name as author_name, author.avatar as author_image',
    )
    .where('post_id = :postID')
    .setParameter('postID', postID)

    .leftJoin(User, 'author', 'author.id = comment.author_id')
    .limit(limit)
    .orderBy('comment.created_at', 'DESC')
    .offset(offset)
    .getRawMany();

  const hasNext = commentsData.length > per_page;

  // For efficient pagination, instead of re-query to get count
  let finalResult = commentsData;
  if (hasNext) {
    finalResult = finalResult.slice(0, per_page);
  }

  return {
    result: finalResult,
    nextPage: hasNext ? page + 1 : null,
  };
};

export default handleGetComments;
