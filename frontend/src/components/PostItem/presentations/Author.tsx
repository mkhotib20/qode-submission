import Image from 'next/image';

import { Box, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { PostItem } from '../models/types';

const Author = ({ data }: PostItem) => {
  const { created_at, author } = data;
  const authorImage = author.avatar;

  const authorName = author.full_name;

  return (
    <Flex justifyContent="center" alignItems="center" marginBottom={2}>
      <Box overflow="hidden" position="relative" borderRadius="32px" height="32px" width="32px">
        <Image src={authorImage} fill alt={authorName} sizes="32px" />
      </Box>
      <Text marginLeft={2} fontSize="smaller" fontWeight={600} flex={1}>
        {authorName} • {dayjs(created_at).fromNow()}
      </Text>
    </Flex>
  );
};

export default Author;
