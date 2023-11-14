import { useRef } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { PostDetailProps } from './models/types';
import CommentSection from './presentations/CommentSection';
import ImageDescription from './presentations/ImageDescription';
import ImageSection from './presentations/ImageSection';
import RightSection from './presentations/RightSection';

const PostDetail = (props: PostDetailProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Flex height={{ base: '90vh', md: '80vh' }} gap={8} flexDir={{ base: 'column', md: 'row' }}>
      <ImageSection {...props} ref={inputRef} />
      <Box flex={1}>
        <RightSection {...props} />
        <ImageDescription postData={props.postData} />
        <CommentSection {...props} ref={inputRef} />
      </Box>
    </Flex>
  );
};

export default PostDetail;
