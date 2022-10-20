import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ProfileCommonBtn } from '../components/Btn/ProfileCommonBtn';

export const AdminView = () => (
  <Flex
    direction="column"
  >

    <ProfileCommonBtn linkTo="/category/form">
      Add new category
    </ProfileCommonBtn>

    <ProfileCommonBtn linkTo="/product/form">
      Add new product
    </ProfileCommonBtn>

    <ProfileCommonBtn linkTo="/user/list">
      User list
    </ProfileCommonBtn>

    <ProfileCommonBtn linkTo="/product/list">
      Product list
    </ProfileCommonBtn>

  </Flex>
);
