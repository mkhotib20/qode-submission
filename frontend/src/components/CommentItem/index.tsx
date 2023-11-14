import { Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CommentItemProps } from './models/types';

dayjs.extend(relativeTime);

const CommentItem = ({ data }: CommentItemProps) => {
  const { author_name, comment: content, synced, created_at } = data;

  return (
    <Box>
      <Text
        textAlign="left"
        opacity={synced ? undefined : 0.5}
        margin="8px 0"
        fontWeight={500}
        fontSize="small"
        marginBottom={0}
        whiteSpace="pre-wrap"
      >
        <strong>{author_name}</strong> {content}
      </Text>
      <Text fontSize="small">{dayjs(created_at).fromNow()}</Text>
    </Box>
  );
};

export default CommentItem;
