'use client';

import { useCallback } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Sidebar from '@/components/Sidebar';
import useIntersect from '@/hooks/useIntersect';

import PostItem from '../../components/PostItem';
import ImageItemLoading from '../../components/PostItem/loader';
import useHomeData from './repository/useFetchHomepage';

const Index = () => {
  const { postData, hasNext, isLoading } = useHomeData();
  const onIntersect = useCallback(() => {}, []);

  const intersectRef = useIntersect(onIntersect);

  return (
    <Flex height="100%">
      <Sidebar />
      <Box margin="auto" maxW="100%" w="500px" padding="20px">
        {!postData.length && !isLoading && <Text>Empty</Text>}
        {isLoading && <ImageItemLoading />}
        {postData.map((photo) => (
          <PostItem data={photo} key={photo.id} />
        ))}
        {hasNext && !isLoading && <div ref={intersectRef} />}
      </Box>
    </Flex>
  );
};

export default Index;
