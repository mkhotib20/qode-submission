import { postRepo } from '@/modules/post/entities/post.entity';
import BadRequest from '@/utils/errors/BadRequest';
import NotFound from '@/utils/errors/NotFound';

import { commentRepo } from '../entities/comment.entity';
import { CreateCommentRequest } from '../models/dto';

const handleCreateComment = async (req: CreateCommentRequest) => {
  if (!req.body.comment) {
    throw new BadRequest('Comment is required!');
  }

  const postID = req.params.id;
  const foundPost = await postRepo().findOne({ where: { id: postID } });
  if (!foundPost) {
    throw new NotFound('Post not found');
  }
  const author = req.user;

  const created = await commentRepo().save({
    post_id: postID,
    author_id: author.id,
    comment: req.body.comment,
  });

  foundPost.comment_count += 1;

  await postRepo().save(foundPost);

  return {
    ...created,
    author_name: req.user.full_name,
    synced: true,
  };
};

export default handleCreateComment;
