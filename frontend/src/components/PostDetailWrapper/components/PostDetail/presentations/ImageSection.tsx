import { forwardRef } from 'react';

import Image from 'next/image';

import { Box, Flex } from '@chakra-ui/react';

import ActionButtons from '@/components/ActionButtons';
import { BASE_URL } from '@/models/constants';

import { PostDetailProps } from '../models/types';

const ImageSection = forwardRef<HTMLTextAreaElement, PostDetailProps>(({ postData }, inpRef) => {
  const imageURL = `${BASE_URL}/${postData.image_path}`;
  const altImage = postData.caption || `image from ${postData.author_name}`;

  return (
    <Flex justifyContent="center" flexDir="column" textAlign="left" display={{ base: 'none', md: 'flex' }}>
      <Image height={512} width={512} src={imageURL} alt={altImage} objectFit="contain" objectPosition="bottom" />
      <Box>
        <ActionButtons
          postID={postData.id}
          isLiked={Boolean(postData.like_id)}
          commentCount={postData.comment_count}
          ref={inpRef}
          likeCount={postData.like_count || 0}
        />
      </Box>
    </Flex>
  );
});

ImageSection.displayName = 'ImageSection';

export default ImageSection;
