import { Comment } from '@/models/types';

export interface CommentResponse {
  result: Comment[];
  nextPage?: number;
}
