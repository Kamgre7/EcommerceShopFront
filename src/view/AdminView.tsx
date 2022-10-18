import React from 'react';
import { Flex } from '@chakra-ui/react';
import { UsersList } from '../components/Table/UsersList';
import { ProductTableList } from '../components/Table/ProductTableList';

export const AdminView = () => {
  console.log('admin page');
  return (
    <Flex
      direction="column"
    >
      <ProductTableList />
      <UsersList />
    </Flex>
  );
};
