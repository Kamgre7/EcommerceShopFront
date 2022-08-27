import React from 'react';
import {
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Input, IconButton, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const Header = () => {
  const handleClick = () => console.log('searchbar on click');

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
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily="heading"
          >
            <Link to="/">Logo</Link>
          </Text>
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'center' }}
        >
          <InputGroup size="md" width="30%">
            <Input
              pr="4.5rem"
              type="text"
              placeholder="What are you lookiang for?"
            />
            <InputRightElement width="4.5rem" right="-15px">
              <IconButton aria-label="Search database" icon={<SearchIcon />} onClick={handleClick} />
            </InputRightElement>
          </InputGroup>
        </Flex>

        <Flex>
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
        </Flex>
      </Flex>
    </Flex>
  );
};
