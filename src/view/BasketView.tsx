import React, { useEffect, useState } from 'react';
import { BasketFilterResponse, CheckoutTotalPriceResponse, RemoveProductFromBasket } from 'types';
import {
  Box, Heading, useColorModeValue, useToast,
} from '@chakra-ui/react';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import './BasketView.css';
import { BasketItemList } from '../components/Basket/BasketItemList';
import { Checkout } from '../components/Basket/Checkout';
import { BasketRemoveAllBtn } from '../components/Btn/BasketRemoveAllBtn';

export const BasketView = () => {
  const [basket, setBasket] = useState<BasketFilterResponse[] | null>(null);
  const [checkout, setCheckout] = useState<CheckoutTotalPriceResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/basket', {
          credentials: 'include',
        });

        const data:BasketFilterResponse[] = await res.json();

        setBasket(data);
      } catch (err) {
        console.error(err, 'err');
      }
    })();
  }, [basket]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/checkout', {
          credentials: 'include',
        });

        const data:CheckoutTotalPriceResponse = await res.json();

        setCheckout(data);
      } catch (err) {
        console.error(err, 'err');
      }
    })();
  }, [checkout]);

  const toast = useToast();

  if (basket === null || checkout === null) {
    return <LoadingSpinner />;
  }

  const removeAllItems = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/basket/all', {
        credentials: 'include',
        method: 'delete',
      });

      const data = (await res.json()) as RemoveProductFromBasket;

      if (data.isSuccess) {
        toast({
          title: 'All items from basket removed successfully',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err, 'err');
    }
  };

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
        <BasketRemoveAllBtn removeAllItems={removeAllItems} />
      </Box>
      <BasketItemList basket={basket} />
      <Checkout checkout={checkout} />
    </Box>
  );
};
