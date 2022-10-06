import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import '../Basket/Checkout.css';

export const BasketCheckoutBtn = () => (
  <Button
    className="button"
    bgColor={useColorModeValue('green.300', 'green.400')}
    _hover={{
      bgColor: 'green.400',
    }}
  >
    Checkout
  </Button>
);
