import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex, Heading,
} from '@chakra-ui/react';
import { UserAddressInterface } from 'types';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { SingleAddress } from './SingleAddress';

export const UserAddressList = () => {
  const [userAddress, setUserAddress] = useState<UserAddressInterface[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/user/address', {
        credentials: 'include',
      });
      const data:UserAddressInterface[] = await res.json();
      setUserAddress(data);
    })();
  }, []);

  if (userAddress === null) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      direction="column"
      minH="10vh"
      mt="1rem"
      width="30vw"
      p={4}
      align="center"
    >
      <Flex>
        <Heading
          as="h3"
          size="md"
        >
          Your delivery addresses
        </Heading>
      </Flex>
      <Flex>
        {
            userAddress.map((address) => <SingleAddress key={address.id} address={address} />)
        }
      </Flex>
      <Link to="/user/edit">
        <Button>Go back to profile</Button>
      </Link>
    </Flex>

  );
};
