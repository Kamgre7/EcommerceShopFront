import React from 'react';
import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Searchbar } from './Searchbar';
import { SignInBtn } from '../Btn/SignInBtn';
import { LogoBanner } from './LogoBanner';
import { useAuth } from '../../hooks/useAuth';
import { UserBtn } from '../Btn/UserBtn';

export const Header = () => {
  const { user } = useAuth();
  const handleClick = () => console.log('searchbar on clicka');

  return (
    <Flex basis="100%">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
        width="100%"
        justify="space-between"
      >
        <Flex
          justify={{ base: 'center', md: 'start' }}
        >
          <LogoBanner />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'center' }}
        >
          <Searchbar handleClick={handleClick} />
        </Flex>

        <Flex>
          {
            user ? <UserBtn /> : <SignInBtn />
          }
        </Flex>

      </Flex>
    </Flex>
  );
};
