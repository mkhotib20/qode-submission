import { Comment } from '@/models/types';

export interface PostData {
  id: string;
  image_path: string;
  caption: string;
  created_at: string;
  author_name: string;
  author_image: string;
  comment_count: number;
  like_count: number;
  like_id?: string;
}

export interface Author {
  id: string;
  email: string;
  full_name: string;
  avatar: string;
  created_at: string;
}

export interface PostItemProps {
  data: PostData;
}

export interface ActionButtonsProps {
  postID: string;
  isLiked?: boolean;
  toggleLike: () => void;
}

export interface CommentItemProps {
  data: Comment;
}
