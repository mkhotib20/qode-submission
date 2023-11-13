import { Flex, Skeleton } from '@chakra-ui/react';

/**
 * Loading state when lazy load
 */
const Loader = () => {
  return (
    <Flex height="200px" flexDir="column" alignItems="center" justifyContent="center">
      <Skeleton marginBottom={2} height={80} width={80} />
      <Skeleton marginBottom={2} height={30} width={40} />
      <Skeleton marginBottom={2} height={20} width={80} />
    </Flex>
  );
};

export default Loader;
