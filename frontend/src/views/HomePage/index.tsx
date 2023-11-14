'use client';

import { Box, Flex, Text } from '@chakra-ui/react';

import PostItem from '@/components/PostItem';
import Sidebar from '@/components/Sidebar';
import useIntersect from '@/hooks/useIntersect';

import ImageItemLoading from '../../components/PostItem/loader';
import useHomeData from './repository/useFetchHomepage';

const Index = () => {
  const { postData, fetchMore, hasNext, isLoading, fetchingMore } = useHomeData();

  const intersectRef = useIntersect(() => {
    if (fetchingMore) return;
    fetchMore();
  });

  return (
    <Flex height="100%">
      <Sidebar />
      <Box margin="auto" maxW="100%" w="500px" padding="20px" paddingBottom="100px">
        {!postData.length && !isLoading && <Text>Empty</Text>}
        {isLoading && <ImageItemLoading />}
        {postData.map((photo) => (
          <PostItem data={photo} key={photo?.id} />
        ))}

        {hasNext && !isLoading && (
          <div ref={intersectRef}>
            <ImageItemLoading />
          </div>
        )}
      </Box>
    </Flex>
  );
};

export default Index;
