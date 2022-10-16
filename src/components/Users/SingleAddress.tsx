import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { UserAddressInterface } from 'types';

interface Props {
  address: UserAddressInterface
}

export const SingleAddress = ({ address }:Props) => {
  const {
    address: street, country, city, mobilePhone, postalCode,
  } = address;

  return (
    <Box
      color={useColorModeValue('gray.600', 'gray.300')}
      fontSize="md"
      border={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius={10}
      p={4}
      m={4}
    >
      <Box>{street}</Box>
      <Box>{city}</Box>
      <Box>{postalCode}</Box>
      <Box>{mobilePhone}</Box>
      <Box>{country}</Box>
    </Box>
  );
};
