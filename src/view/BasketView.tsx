import React, { useEffect, useState } from 'react';
import { BasketFilterResponse, CheckoutTotalPriceResponse } from 'types';
import {
  Box, Heading, useColorModeValue,
} from '@chakra-ui/react';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import './BasketView.css';
import { BasketItemList } from '../components/Basket/BasketItemList';
import { Checkout } from '../components/Basket/Checkout';

export const BasketView = () => {
  const [basket, setBasket] = useState<BasketFilterResponse[] | null>(null);
  const [checkout, setCheckout] = useState<CheckoutTotalPriceResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/basket', {
          credentials: 'include',
        });

        const data = (await res.json()) as BasketFilterResponse[];

        setBasket(data);
      } catch (err) {
        console.error(err, 'err');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/checkout', {
          credentials: 'include',
        });

        const data = (await res.json()) as CheckoutTotalPriceResponse;

        setCheckout(data);
      } catch (err) {
        console.error(err, 'err');
      }
    })();
  }, []);

  if (basket === null || checkout === null) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      className="cart-container"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Box
        className="header"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        <Heading as="h3" size="md" className="heading">Shopping Cart</Heading>
        <Heading
          as="h5"
          size="md"
          className="action"
          color={useColorModeValue('red.500', 'red.400')}
          borderColor={useColorModeValue('red.500', 'red.400')}
        >
          Remove all
        </Heading>
      </Box>
      <BasketItemList basket={basket} />
      <Checkout checkout={checkout} />
    </Box>
  );
};
