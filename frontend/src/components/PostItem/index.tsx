import { useState } from 'react';

import Image from 'next/image';

import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { BASE_URL } from '@/models/constants';

import { PostItem } from './models/types';
import ActionButtons from './presentations/ActionButtons';
import Author from './presentations/Author';
import CommentSection from './presentations/CommentSection';
import ImageDescription from './presentations/ImageDescription';

dayjs.extend(relativeTime);

const PostItem = ({ data }: PostItem) => {
  const [isLiked, setIsLiked] = useState(false);

  const { image_path, author } = data;
  const author_name = author?.full_name;

  const image_url = `${BASE_URL}/${image_path}`;

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Box maxW="100%" width="470px" margin="20px 0 32px">
      <Author data={data} />
      <Image onDoubleClick={handleToggleLike} src={image_url} width={470} height={470} alt={author_name} />
      <ActionButtons isLiked={isLiked} toggleLike={handleToggleLike} />
      <ImageDescription data={data} />
      <CommentSection data={data} />
    </Box>
  );
};

export default PostItem;
