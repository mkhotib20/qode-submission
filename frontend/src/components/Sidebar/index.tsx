import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai';

import Link from 'next/link';

import { Flex, FlexProps, Text, useDisclosure } from '@chakra-ui/react';

import UploadWizard from '@/components/UploadWizard/Lazy';

const ACTION_ITEM_PROPS: FlexProps = {
  flex: { base: 1, md: 'unset' },
  alignItems: 'center',
  gap: { base: 0, lg: 4 },
  padding: '20px',
  as: 'button',
  textAlign: { base: 'center', md: 'left' },
  marginTop: { md: 2 },
  justifyContent: { base: 'center', md: 'unset' },
  fontWeight: 500,
};

const Sidebar = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        zIndex={9}
        width={{
          base: '100%',
          md: '76px',
          lg: '244px',
        }}
        bgColor="#ffffff"
        borderRight={{ md: '1px solid #dbdbdb' }}
        borderTop={{ base: '1px solid #dbdbdb', md: 'unset' }}
        position="fixed"
        top={{ md: 0 }}
        bottom={0}
        left={0}
        right={{ base: 0, md: 'unset' }}
        flexDir={{ base: 'row', md: 'column' }}
      >
        <Text display={{ base: 'none', lg: 'block' }} fontWeight={700} textAlign="center" marginTop={3}>
          Qodegram
        </Text>
        <Flex {...ACTION_ITEM_PROPS} as={Link} href="/">
          <AiOutlineHome size={24} />
          <Text display={{ base: 'none', lg: 'block' }}>Home</Text>
        </Flex>
        <Flex {...ACTION_ITEM_PROPS}>
          <AiOutlineSearch size={24} />
          <Text display={{ base: 'none', lg: 'block' }}>Search</Text>
        </Flex>
        <Flex {...ACTION_ITEM_PROPS} onClick={() => onOpen()}>
          <AiOutlinePlusCircle size={24} /> <Text display={{ base: 'none', lg: 'block' }}>Create</Text>
        </Flex>
      </Flex>
      <UploadWizard isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
