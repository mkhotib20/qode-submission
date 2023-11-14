import Image from 'next/image';

import { Box, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { PostItemProps } from '../models/types';

const Author = ({ data }: PostItemProps) => {
  const { created_at, author_name, author_image } = data;

  return (
    <Flex justifyContent="center" alignItems="center" marginBottom={2}>
      <Box overflow="hidden" position="relative" borderRadius="32px" height="32px" width="32px">
        <Image src={author_image} fill alt={author_name} sizes="32px" />
      </Box>
      <Text marginLeft={2} fontSize="smaller" fontWeight={600} flex={1}>
        {author_name} • {dayjs(created_at).fromNow()}
      </Text>
    </Flex>
  );
};

export default Author;
