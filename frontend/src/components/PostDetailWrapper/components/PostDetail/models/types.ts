import { CommentResponse } from '@/components/PostDetailWrapper/models/types';
import { PostData } from '@/models/types';

export interface PostDetailProps {
  postData: PostData;
  postComment: CommentResponse;
  onFetchMore: () => void;
}
