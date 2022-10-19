import React from 'react';
import { Flex } from '@chakra-ui/react';
import { UserTableList } from '../components/Table/UserTableList';
import { ProductTableList } from '../components/Table/ProductTableList';

export const AdminView = () => {
  console.log('admin page');
  return (
    <Flex
      direction="column"
    >
      <ProductTableList />
      <UserTableList />
    </Flex>
  );
};
