import React from 'react';
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

const Links = ['Laptop', 'Smartphone', 'TV and audio', 'Smarthome', 'Accessory'];

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {Links.map((link) => (
              <NavigationLink key={link} productLink={link}>{link}</NavigationLink>
            ))}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavigationLink key={link} productLink={link}>{link}</NavigationLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
