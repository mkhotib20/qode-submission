import { useState } from 'react';

import { Text } from '@chakra-ui/react';

import { PostItem } from '../models/types';

const ImageDescription = ({ data }: PostItem) => {
  const [openedMore, setOpenedMore] = useState(false);
  const { caption, author } = data;

  const like_amount = 0;
  const authorName = author.full_name;

  return (
    <>
      <Text fontWeight={500} fontSize="small">
        {like_amount?.toLocaleString() || '0'} LIKES
      </Text>
      <Text {...(!openedMore && { noOfLines: 2 })} fontWeight={500} fontSize="small">
        {authorName} - {caption}
      </Text>
      {!openedMore && (
        <Text onClick={() => setOpenedMore(true)} as="button" fontSize="small" fontWeight={700} bgColor="transparent">
          more
        </Text>
      )}
    </>
  );
};

export default ImageDescription;
