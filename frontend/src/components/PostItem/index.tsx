import { useRef } from 'react';

import Image from 'next/image';

import { Box, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import ActionButtons from '@/components/ActionButtons';
import { BASE_URL } from '@/models/constants';

import { PostItemProps } from './models/types';
import Author from './presentations/Author';
import CommentSection from './presentations/CommentSection';
import ImageDescription from './presentations/ImageDescription';

dayjs.extend(relativeTime);

const PostItem = ({ data }: PostItemProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { image_path, author_name } = data;

  const image_url = `${BASE_URL}/${image_path}`;

  return (
    <Box maxW="100%" width="470px" margin="20px 0 32px">
      <Author data={data} />
      <Image src={image_url} width={470} height={470} alt={author_name} />
      <ActionButtons
        isLiked={Boolean(data.like_id)}
        postID={data.id}
        likeCount={data.like_count}
        commentCount={data.comment_count}
        ref={inputRef}
      />
      <ImageDescription data={data} />
      <Divider margin="20px 0" />
      <CommentSection ref={inputRef} data={data} />
    </Box>
  );
};

export default PostItem;
