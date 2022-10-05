import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export const SignInBtn = () => (
  <Link to="login">
    <Button
      display={{ base: 'center', md: 'inline-flex' }}
      fontSize="sm"
      fontWeight={600}
      type="submit"
      bg="blue.400"
      color="white"
      _hover={{
        bg: 'blue.500',
      }}
    >
      Sign in
    </Button>
  </Link>
);
