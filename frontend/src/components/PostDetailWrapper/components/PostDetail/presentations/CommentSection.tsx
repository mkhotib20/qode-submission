import { forwardRef, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { Box, Button, Flex, Textarea } from '@chakra-ui/react';

import CommentItem from '@/components/CommentItem';
import useAuth from '@/context/auth/hooks/useAuth';
import useComment from '@/usecase/useComment';

import { PostDetailProps } from '../models/types';

const CommentSection = forwardRef<HTMLTextAreaElement | null, PostDetailProps>((props, inpRef) => {
  const { postData, postComment, onFetchMore } = props;
  const { isLoggedIn } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { loading, showedComment, submitComment } = useComment({ data: postData });

  const [value, setValue] = useState('');
  const handleSubmit = () => {
    setValue('');
    submitComment(value);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  return (
    <Flex height="80vh" flexDir="column">
      <Box ref={scrollRef} flex={1} textAlign="left" maxH={{ base: 600, md: 400 }} overflowY="auto">
        {showedComment?.length && showedComment.map((data) => <CommentItem data={data} key={data.id} />)}
        {postComment.result.map((item) => (
          <CommentItem key={item.id} data={{ ...item, synced: true }} />
        ))}
        {/* fetch more comments */}
        {Boolean(postComment.nextPage) && (
          <Box textAlign="center" marginTop={4}>
            <Button bgColor="transparent" onClick={onFetchMore}>
              <AiOutlinePlusCircle size={24} />
            </Button>
          </Box>
        )}
      </Box>
      <Box borderBottom="1px solid #ebebeb" marginTop={4}>
        <Textarea
          disabled={!isLoggedIn || loading}
          rows={1}
          placeholder={isLoggedIn ? 'Add a comment...' : 'Login to comment'}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          ref={inpRef}
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
    </Flex>
  );
});

CommentSection.displayName = 'CommentSection';

export default CommentSection;
