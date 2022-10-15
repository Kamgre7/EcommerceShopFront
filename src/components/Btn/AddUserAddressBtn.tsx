import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, Text, Stack, Center,
} from '@chakra-ui/react';

export const AddUserAddressBtn = () => (
  <Box>
    <Stack
      align="center"
      spacing={8}
      mx="auto"
      maxW="2xl"
      py={6}
      px={6}
    >
      <Text fontSize="lg">
        Address information
      </Text>
    </Stack>
    <Center>
      <Link to="/user/address/form">
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
          Add new address
        </Button>
      </Link>
    </Center>
  </Box>

);
