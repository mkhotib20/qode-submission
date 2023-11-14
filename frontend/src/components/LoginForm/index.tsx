import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Alert, AlertIcon, Button, Flex, Text } from '@chakra-ui/react';

import { API_URL } from '@/models/constants';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const handleLogin = async () => {
    setLoading(true);
    const rsp = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    if (!rsp.ok) {
      setError('Failed to login, please try again later');
      return;
    }
    window.location.replace(pathname);
  };
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center" minH={300}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text>{error}</Text>
        </Alert>
      )}
      <Text>To interact with or upload an image, please login first</Text>
      <Button isLoading={loading} onClick={handleLogin} marginTop={4}>
        Login with Dummy Auth
      </Button>
    </Flex>
  );
};

export default LoginForm;
