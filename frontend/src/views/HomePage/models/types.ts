import { PostData } from '@/components/PostItem/models/types';

export interface PostResponse {
  result: PostData[];
  nextPage: number;
}
