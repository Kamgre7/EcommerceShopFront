import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { CategoryFilterResponse } from 'types';

export const CategoryLink = ({ children, category }: { children: ReactNode, category: CategoryFilterResponse }) => (
  <Link
    to={`product/category/${category.name.toLowerCase()}`}
    state={{
      category: category.id,
    }}
  >
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
