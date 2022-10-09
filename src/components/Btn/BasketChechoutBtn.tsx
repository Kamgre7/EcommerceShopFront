import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import '../Basket/Checkout.css';
import { Link } from 'react-router-dom';

export const BasketCheckoutBtn = () => (
  <Link to="/order">
    <Button
      className="button"
      bgColor={useColorModeValue('green.300', 'green.400')}
      _hover={{
        bgColor: 'green.400',
      }}
      type="button"
    >
      Checkout
    </Button>
  </Link>

);
