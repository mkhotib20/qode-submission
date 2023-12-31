import { forwardRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Text, Textarea } from '@chakra-ui/react';

import CommentItem from '@/components/CommentItem';
import useAuth from '@/context/auth/hooks/useAuth';
import useComment from '@/usecase/useComment';

import type { PostItemProps } from '../models/types';

const CommentSection = forwardRef<HTMLTextAreaElement | null, PostItemProps>(({ data }, inputRef) => {
  const { loading, showedComment, submitComment } = useComment({ data });
  const { isLoggedIn } = useAuth();

  const pathname = usePathname();
  const [value, setValue] = useState('');

  const { comment_count } = data;

  const handleSubmit = () => {
    setValue('');
    submitComment(value);
  };
  return (
    <>
      {showedComment?.length && showedComment.map((data) => <CommentItem data={data} key={data.id} />)}
      <Box borderBottom="1px solid #ebebeb" marginTop={4}>
        {Boolean(comment_count) && (
          <Box marginBottom={2}>
            <Text as={Link} href={`${pathname}?p=${data.id}`} fontSize="small">
              View all {comment_count} comments
            </Text>
          </Box>
        )}

        <Textarea
          disabled={!isLoggedIn || loading}
          rows={1}
          placeholder={isLoggedIn ? 'Add a comment...' : 'Login to comment'}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          ref={inputRef}
          resize="none"
          border="none"
          borderRadius={0}
          _focus={{
            outline: 'none',
            borderColor: 'transparent',
          }}
        />
      </Box>
      <div style={{ textAlign: 'right' }}>
        {Boolean(value.length) && (
          <Box onClick={handleSubmit} disabled={loading} textAlign="right" fontSize="small" color="blue" as="button">
            Send
          </Box>
        )}
      </div>
    </>
  );
});

CommentSection.displayName = 'CommentSection';

export default CommentSection;
