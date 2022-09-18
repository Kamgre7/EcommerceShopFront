import React, { useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Carousel } from '../components/Carousel/Carousel';
import { RankingProducts } from '../components/Product/RankingProducts';
import { ShopContext } from '../context/shop.context';

export const HomeView = () => {
  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  const { rankingProducts } = context;

  return (
    <Flex justify="center" pt="20px" direction="column" align="center">
      <Carousel />
      <Heading size="lg" mt="1rem"> Top products</Heading>
      <RankingProducts rankingProducts={rankingProducts} />
    </Flex>
  );
};
