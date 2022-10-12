import React from 'react';
import { CheckoutOrderHistoryResponse } from 'types';
import {
  Flex, Heading, Text, Divider, useColorModeValue,
} from '@chakra-ui/react';
import { SingleOrderBasket } from './SingleOrderBasket';

interface Props {
  order: CheckoutOrderHistoryResponse
}

export const SingleOrder = ({ order }:Props) => {
  const {
    items, total, address,
  } = order;

  return (
    <Flex
      direction="column"
      minH="10vh"
      mt="1rem"
      width="30vw"
      border={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius={10}
      p={4}
    >
      <Heading
        as="h3"
        size="md"
      >
        Order delivered
      </Heading>
      <Divider mb={3} mt={3} />
      {
              items.map((item) => <SingleOrderBasket key={item.id} item={item} />)
      }
      <Divider mb="1rem" />
      <Text>
        {` Total price: $ ${total.toFixed(2)}`}
      </Text>
      <div>{address.address}</div>
    </Flex>

  );
};
