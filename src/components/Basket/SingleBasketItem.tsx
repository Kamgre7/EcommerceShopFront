import React from 'react';
import {
  Heading, Image, Box, useColorModeValue, Flex, Button, useToast,
} from '@chakra-ui/react';
import './SingleBasketItem.css';
import { BasketFilterResponse, BasketUpdateResponse, RemoveProductFromBasket } from 'types';
import { DeleteIcon } from '@chakra-ui/icons';

interface Props {
  item: BasketFilterResponse
}

export const SingleBasketItem = (props: Props) => {
  const { item } = props;
  const toast = useToast();

  const imgLink = `http://localhost:3001/product/photo/${item.product.id}`;

  const removeSingleItem = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/basket/${item.id}`, {
        credentials: 'include',
        method: 'DELETE',
      });

      const data = (await res.json()) as RemoveProductFromBasket;

      if (data.isSuccess) {
        toast({
          title: 'Item removed from basket',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateItemQuantity = async (quantity: number) => {
    try {
      const res = await fetch('http://localhost:3001/basket', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          quantity,
          basketId: item.id,
        }),
      });

      const data = (await res.json()) as BasketUpdateResponse;

      if (!data.isSuccess) {
        toast({
          title: data.message,
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex className="cart-items">
      <Box width="15%">
        <Image
          src={imgLink}
          alt={item.product.name}
          align="center"
          w="100px"
          h={{ base: '100%', sm: '100px', lg: '100px' }}
        />
      </Box>
      <Box
        width="20%"
      >
        <Heading
          size="md"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {item.product.name}
        </Heading>
      </Box>
      <Flex
        className="counter"
      >
        <Button
          onClick={async (e:React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            await updateItemQuantity(1);
          }}
          className="btn"
          color={useColorModeValue('gray.600', 'gray.300')}
          bg={useColorModeValue('gray.100', 'gray.600')}
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        >
          +
        </Button>
        <Box
          className="count"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {item.quantity}
        </Box>
        <Button
          onClick={async (e:React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            await updateItemQuantity(-1);
          }}
          className="btn"
          color={useColorModeValue('gray.600', 'gray.300')}
          bg={useColorModeValue('gray.100', 'gray.600')}
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        >
          -
        </Button>
      </Flex>
      <Flex
        justify="center"
        align="center"
      >

        <Box
          className="amount"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {`${item.product.price}$`}
        </Box>
        <Button onClick={removeSingleItem}><DeleteIcon /></Button>
      </Flex>

    </Flex>
  );
};
