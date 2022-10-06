import React from 'react';
import './Checkout.css';
import {
  Box, Flex, Text,
} from '@chakra-ui/react';
import { CheckoutTotalPriceResponse } from 'types';
import { BasketCheckoutBtn } from '../Btn/BasketChechoutBtn';

interface Props {
  checkout: CheckoutTotalPriceResponse
}

export const Checkout = ({ checkout }: Props) => {
  const { totalItems, totalPrice } = checkout;

  return (
    <Flex
      className="checkout"
      justify="flex-end"
      width="100%"
    >
      <Box className="total">
        <Box>
          <Text className="Subtotal">Sub-Total</Text>
          <Text className="items">
            {`${totalItems} items`}
          </Text>
          <Text className="total-amount">
            {`$${totalPrice}`}
          </Text>
        </Box>
      </Box>
      <BasketCheckoutBtn />
    </Flex>
  );
};
