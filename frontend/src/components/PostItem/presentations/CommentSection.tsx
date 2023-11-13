import type { KeyboardEventHandler } from 'react';
import { useRef, useState } from 'react';

import { Box, Textarea } from '@chakra-ui/react';

import { PostItem } from '../models/types';

const CommentSection = ({ data }: PostItem) => {
  const [rows, setRows] = useState(1);

  const inpRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (commentValue: string) => {
    fetch(`/api/v1/comment/${data.id}`, {
      body: JSON.stringify({ comment: commentValue }),
      method: 'POST',
      headers: {
        'Content-Type': 'Application/Json',
      },
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const isEnter = e.key === 'Enter';

    if (isEnter && !e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
      handleSubmit(e.currentTarget.value);
      return;
    }
    if (isEnter && e.shiftKey) {
      setRows((prev) => prev + 1);
    }
  };

  return (
    <Box borderBottom="1px solid #ebebeb" marginTop={4}>
      <Textarea
        placeholder="Add a comment..."
        ref={inpRef}
        resize="none"
        border="none"
        _focus={{
          outline: 'none',
          borderColor: 'transparent',
        }}
        onKeyDown={handleKeyDown}
        rows={rows}
      />
    </Box>
  );
};

export default CommentSection;
