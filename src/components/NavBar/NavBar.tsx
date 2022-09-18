import React, { useContext } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavigationLink } from './NavigationLink';
import { ShopContext } from '../../context/shop.context';

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  const { categories } = context;

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4} width="full">
      <Flex h={16} alignItems="center" justifyContent={{ base: 'flex-start', md: 'center' }}>
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {categories.map((category) => (
              <NavigationLink key={category.id} category={category}>{category.name}</NavigationLink>
            ))}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {categories.map((category) => (
              <NavigationLink key={category.id} category={category}>{category.name}</NavigationLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
