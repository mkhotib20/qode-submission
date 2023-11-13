export interface PostData {
  id: string;
  image_path: string;
  caption: string;
  author_id: string;
  created_at: string;
  author: Author;
}

export interface Author {
  id: string;
  email: string;
  full_name: string;
  avatar: string;
  created_at: string;
}

export interface PostItem {
  data: PostData;
}

export interface ActionButtonsProps {
  isLiked?: boolean;
  toggleLike: () => void;
}
