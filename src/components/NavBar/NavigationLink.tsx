import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const NavigationLink = ({ children, productLink }: { children: ReactNode, productLink: string }) => (
  <Link to={`product/${productLink.toLowerCase()}`}>
    <Box
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Box>

  </Link>
);
