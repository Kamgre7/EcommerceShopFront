import React from 'react';
import {
  Box, Flex,
} from '@chakra-ui/react';
import { Header } from '../components/Header/Header';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { CategoryList } from '../components/NavBar/CategoryList';
import { BasketBtn } from '../components/Btn/BasketBtn';

export const NavigationView = () => (
  <>
    <Box textAlign="center" fontSize="xl" minH="10vh" p={3}>
      <Flex
        width="100%"
        justify="space-between"
      >
        <Header />
        <BasketBtn />
        <ColorModeSwitcher justifySelf="flex-end" alignSelf="center" />
      </Flex>
    </Box>
    <Flex width="100%">
      <CategoryList />
    </Flex>
  </>

);
