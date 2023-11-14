import { FastifyRequest } from 'fastify';

import { AppDataSource } from '@/config/db';
import NotFound from '@/utils/errors/NotFound';

import { PostUserLike, postUserLikeRepo } from '../entities/post-like.entity';
import { postRepo } from '../entities/post.entity';

const handleAttemptLike = async (
  req: FastifyRequest<{
    Params: { id: string };
    Querystring: { page: string; per_page: string };
  }>,
) => {
  const postID = req.params.id;

  const foundPost = await postRepo().findOne({ where: { id: postID } });
  if (!foundPost) {
    throw new NotFound('Post not found');
  }

  const userID = req.user.id;

  const foundPostUserLike = await postUserLikeRepo().findOne({
    where: { post_id: postID, user_id: userID },
    select: ['id'],
  });

  foundPost.like_count = foundPost.like_count + (foundPostUserLike ? -1 : 1);
  await AppDataSource.transaction(async (trxMan) => {
    await trxMan.save(foundPost);
    if (!foundPostUserLike) {
      await trxMan.insert(PostUserLike, { post_id: foundPost.id, user_id: userID });
      return;
    }
    await trxMan.delete(PostUserLike, { id: foundPostUserLike.id });
  });

  return 'Operation Success!';
};

export default handleAttemptLike;
