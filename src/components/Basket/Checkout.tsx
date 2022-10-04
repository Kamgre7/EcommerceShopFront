import React from 'react';
import './Checkout.css';
import { Box, Button, Flex } from '@chakra-ui/react';
import { CheckoutTotalPriceResponse } from 'types';

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
          <Box className="Subtotal">Sub-Total</Box>
          <Box className="items">
            {`${totalItems} items`}
          </Box>
          <Box className="total-amount">
            {`$${totalPrice}`}
          </Box>
        </Box>
      </Box>
      <Button className="button">Checkout</Button>
    </Flex>
  );
};
