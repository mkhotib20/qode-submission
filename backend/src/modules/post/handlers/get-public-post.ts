import { FastifyRequest } from 'fastify';

import { User } from '@/modules/user/entities/user.entity';

import { PostUserLike } from '../entities/post-like.entity';
import { postRepo } from '../entities/post.entity';
import { GetHomepageRequest } from '../models/types';

const handleGetPublicPost = async (req: FastifyRequest<GetHomepageRequest>) => {
  const search = req.query.search;
  const page = parseInt(req.query.page || '1', 10);
  const per_page = parseInt(req.query.per_page || '10', 10);

  const limit = per_page + 1;
  const offset = (page - 1) * per_page;

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
    .leftJoin(User, 'user', 'post.author_id = user.id')
    .orderBy('post.created_at', 'DESC')
    .limit(limit)
    .offset(offset);

  if (search) {
    queryBuilder
      .orWhere('caption ILIKE :keyword')
      .orWhere('author_name ILIKE :keyword')
      .setParameter('keyword', `%${search}%`);
  }

  // logged in user need to check if it's already liked or not
  if (req.user?.id) {
    queryBuilder
      .addSelect('post_user_like.id as like_id')
      .leftJoin(PostUserLike, 'post_user_like', 'post.id = post_user_like.post_id AND post_user_like.user_id = :userID')
      .setParameter('userID', req.user.id);
  }

  const postData = await queryBuilder.getRawMany();
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
