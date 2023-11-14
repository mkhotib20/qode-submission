import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CommentItemProps } from './models/types';

dayjs.extend(relativeTime);

const CommentItem = ({ data }: CommentItemProps) => {
  const { author_name, author_image, comment: content, synced, created_at } = data;

  return (
    <Box marginBottom={4}>
      <Flex alignItems="flex-start" gap="8px">
        <Avatar width={6} height={6} src={author_image} />
        <Box>
          <Box
            backgroundColor="#ebebeb"
            padding={3}
            borderRadius={10}
            textAlign="left"
            opacity={synced ? undefined : 0.5}
            fontWeight={500}
            fontSize="small"
            marginBottom={0}
            whiteSpace="pre-wrap"
            alignItems="center"
            gap="4px"
          >
            <strong>{author_name}</strong> <br />
            {content}
          </Box>
          <Text fontSize="12">{dayjs(created_at).fromNow()}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CommentItem;
