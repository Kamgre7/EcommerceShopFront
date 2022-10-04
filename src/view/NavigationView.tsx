import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '../components/Header/Header';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavBar } from '../components/NavBar/NavBar';

export const NavigationView = () => (
  <>
    <Box textAlign="center" fontSize="xl" minH="10vh" p={3}>
      <Flex
        width="100%"
        justify="space-between"
      >
        <Header />
        <ColorModeSwitcher justifySelf="flex-end" alignSelf="center" />
      </Flex>
    </Box>
    <Flex width="100%">
      <NavBar />
    </Flex>
  </>

);
