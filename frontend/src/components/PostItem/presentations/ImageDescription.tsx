import { useEffect, useRef, useState } from 'react';

import { Text } from '@chakra-ui/react';

import { PostItemProps } from '../models/types';

const ImageDescription = ({ data }: PostItemProps) => {
  const { caption, author_name } = data;

  const [openedMore, setOpenedMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    setTruncated(Boolean(textRef.current?.clientHeight >= 39));
  }, [caption]);

  return (
    <>
      <Text
        ref={textRef}
        {...(!openedMore && { noOfLines: 2 })}
        fontWeight={500}
        fontSize="small"
        whiteSpace="pre-wrap"
      >
        <strong>{author_name}</strong> {caption}
      </Text>
      {!openedMore && truncated && (
        <Text onClick={() => setOpenedMore(true)} as="button" fontSize="small" fontWeight={700} bgColor="transparent">
          more
        </Text>
      )}
    </>
  );
};

export default ImageDescription;
