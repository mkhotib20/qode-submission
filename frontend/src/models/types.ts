import { PropsWithChildren } from 'react';

/**
 * Make general component props with children
 */
export type ComponentProps<PropTypes = unknown> = PropsWithChildren<PropTypes>;

export interface Comment {
  id: string;
  author_name: string;
  author_image: string;
  comment: string;
  created_at: string;
  synced?: boolean;
}

export interface PostData {
  id: string;
  like_id?: string;
  image_path: string;
  caption: string;
  created_at: string;
  author_name: string;
  author_image: string;
  comment_count: number;
  like_count: number;
}
