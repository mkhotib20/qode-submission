import Image from 'next/image';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { PostDetailProps } from '../models/types';

const RightSection = ({ postData }: PostDetailProps) => {
  const { author_image, author_name, created_at } = postData;
  return (
    <>
      <Flex justifyContent="flex-start" alignItems="center" marginBottom={2}>
        <Box overflow="hidden" position="relative" borderRadius="32px" height="32px" width="32px">
          <Image src={author_image} fill alt={author_name} sizes="32px" />
        </Box>
        <Text marginLeft={2} fontSize="smaller" fontWeight={600}>
          {author_name} • {dayjs(created_at).fromNow()}
        </Text>
      </Flex>
      <Divider margin="20px 0" />
    </>
  );
};

export default RightSection;
