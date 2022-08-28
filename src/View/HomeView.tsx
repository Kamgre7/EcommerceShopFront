import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Carousel } from '../components/Carousel/Carousel';

export const HomeView = () => (
  <Flex justify="center" pt="20px" direction="column" align="center">
    <Carousel />
    <h1> Ranking list</h1>
  </Flex>
);
