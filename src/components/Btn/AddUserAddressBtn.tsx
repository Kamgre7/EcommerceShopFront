import React from 'react';
import {
  Box, Text, Stack,
} from '@chakra-ui/react';
import { ProfileCommonBtn } from './ProfileCommonBtn';

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

    <ProfileCommonBtn linkTo="/user/address/form">
      Add new address
    </ProfileCommonBtn>
  </Box>

);
