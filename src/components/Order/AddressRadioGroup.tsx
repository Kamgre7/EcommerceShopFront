import React, { useEffect, useState } from 'react';
import {
  HStack, useRadioGroup, Text, Flex, useColorModeValue,
} from '@chakra-ui/react';
import { UserAddressInterface } from 'types';
import { AddressCard } from './AddressCard';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

interface Props {
  selectedUserAddress: (id:string)=>void;
}

export const AddressRadioGroup = ({ selectedUserAddress }:Props) => {
  const [userAddress, setUserAddress] = useState<UserAddressInterface[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/user/address', {
          credentials: 'include',
        });

        const data:UserAddressInterface[] = await res.json();
        setUserAddress(() => [...data]);
      } catch (err) {
        console.error(err, 'err');
      }
    })();
  }, []);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'userAddress',
    defaultValue: '',
    onChange: (id:string) => {
      selectedUserAddress(id);
    },
  });

  const group = getRootProps();

  if (userAddress === null) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      mt="1rem"
      direction="column"
      border={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={10}
    >
      <Text
        textAlign="center"
        margin="10px 10px"
      >
        Choose address to delivery:
      </Text>
      <HStack
        align="center"
        justify="center"
        padding={5}
        {...group}
      >
        {userAddress.map((address) => {
          const radio = getRadioProps({ value: address.id });
          return (
            <AddressCard key={address.id} {...radio}>
              <Text>{address.address}</Text>
              <Text>{address.city}</Text>
              <Text>{address.postalCode}</Text>
              <Text>{address.country}</Text>
              <Text>{address.mobilePhone}</Text>
            </AddressCard>
          );
        })}
      </HStack>
    </Flex>
  );
};
