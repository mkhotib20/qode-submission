import { Skeleton } from '@chakra-ui/react';

const ImageItemLoading = () => {
  return (
    <>
      <Skeleton height={4} marginBottom={4} />
      <Skeleton height={300} marginBottom={4} />
      <Skeleton height={4} width={140} marginBottom={4} />
      <Skeleton height={4} width={100} />
    </>
  );
};

export default ImageItemLoading;
