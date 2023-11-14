import { FastifyRequest } from 'fastify';

import { User } from '@/modules/user/entities/user.entity';
import NotFound from '@/utils/errors/NotFound';

import { PostUserLike } from '../entities/post-like.entity';
import { postRepo } from '../entities/post.entity';

const handleGetDetail = async (req: FastifyRequest<{ Params: { id: string } }>) => {
  const postID = req.params.id;
  const queryBuilder = postRepo()
    .createQueryBuilder('post')
    .select([
      'post.id as id',
      'image_path as image_path',
      'caption as caption',
      'like_count',
      'comment_count',
      'post.created_at as created_at',
      'user.full_name as author_name',
      'user.avatar as author_image',
    ])
    .where('post.id = :postID')
    .setParameter('postID', postID)
    .leftJoin(User, 'user', 'post.author_id = user.id');

  // logged in user need to check if it's already liked or not
  if (req.user?.id) {
    queryBuilder
      .addSelect('post_user_like.id as like_id')
      .leftJoin(PostUserLike, 'post_user_like', 'post.id = post_user_like.post_id AND post_user_like.user_id = :userID')
      .setParameter('userID', req.user.id);
  }

  const foundPost = await queryBuilder.getRawOne();

  if (!foundPost) {
    throw new NotFound('No post found');
  }

  return foundPost;
};

export default handleGetDetail;
