import { useEffect, useRef, useState } from 'react';

import { Box, Divider, Text } from '@chakra-ui/react';

import { PostDetailProps } from '../models/types';

const ImageDescription = ({ postData }: Pick<PostDetailProps, 'postData'>) => {
  const { caption } = postData;

  const [openedMore, setOpenedMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    setTruncated(Boolean(textRef.current?.clientHeight >= 39));
  }, [caption]);

  return (
    <Box textAlign="left">
      <Text
        ref={textRef}
        {...(!openedMore && { noOfLines: 2 })}
        fontWeight={500}
        fontSize="small"
        whiteSpace="pre-wrap"
      >
        {caption}
      </Text>
      {!openedMore && truncated && (
        <Text onClick={() => setOpenedMore(true)} as="button" fontSize="small" fontWeight={700} bgColor="transparent">
          more
        </Text>
      )}
      <Divider margin="20px 0" />
    </Box>
  );
};

export default ImageDescription;
