import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, Center,
} from '@chakra-ui/react';

export const CurrentAddressBtn = () => (
  <Box>
    <Center>
      <Link to="/user/address/">
        <Button
          display={{ base: 'center', md: 'inline-flex' }}
          fontSize="sm"
          fontWeight={600}
          type="submit"
          bg="blue.400"
          color="white"
          mt={5}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Show addresses
        </Button>
      </Link>
    </Center>
  </Box>

);
