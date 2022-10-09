import React from 'react';
import {
  Flex, Divider,
} from '@chakra-ui/react';
import { BasketFilterResponse } from 'types';
import { SingleBasketItem } from './SingleBasketItem';

interface Props {
  basket: BasketFilterResponse[];
}

export const BasketItemList = (props:Props) => {
  const { basket } = props;

  return (
    <Flex
      direction="column"
      minH="15vh"
      mt="1rem"
    >
      {
            basket.map((item) => <SingleBasketItem key={item.id} item={item} />)
      }
      <Divider mb="1rem" />
    </Flex>
  );
};
