import { AiOutlineCloudUpload, AiOutlineHome, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Flex, FlexProps, Text } from '@chakra-ui/react';

import useAuth from '@/context/auth/hooks/useAuth';
import { API_URL } from '@/models/constants';

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
  const pathname = usePathname();

  const { isLoggedIn } = useAuth();

  const handleLogout = () => {
    fetch(`${API_URL}/auth/logout`).then(() => {
      // full reload page
      window.location.reload();
    });
  };

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

        <Flex {...ACTION_ITEM_PROPS} as={Link} href={`${pathname}?l=${isLoggedIn ? 'upload' : 'login'}`}>
          <AiOutlineCloudUpload size={24} /> <Text display={{ base: 'none', lg: 'block' }}>Upload</Text>
        </Flex>
        {isLoggedIn && (
          <Flex {...ACTION_ITEM_PROPS} onClick={handleLogout}>
            <AiOutlineLogout size={24} /> <Text display={{ base: 'none', lg: 'block' }}>Logout</Text>
          </Flex>
        )}
        {!isLoggedIn && (
          <Flex {...ACTION_ITEM_PROPS} as={Link} href={`${pathname}?l=login`}>
            <AiOutlineLogin size={24} /> <Text display={{ base: 'none', lg: 'block' }}>Login</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Sidebar;
