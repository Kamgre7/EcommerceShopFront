import React from 'react';
import {
  Heading, Image, Box, Text, useColorModeValue,
} from '@chakra-ui/react';
import './SingleBasketItem.css';
import { BasketFilterResponse } from 'types';

interface Props {
  item: BasketFilterResponse
}

export const SingleBasketItem = (props: Props) => {
  const { item } = props;
  /*
  const toast = useToast();
*/

  const imgLink = `http://localhost:3001/product/photo/${item.product.id}`;

  /* const removeItemFromBasket = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); */

  /*  toast({
    title: 'Item deleted from basket!',
    status: 'info',
    duration: 2000,
    isClosable: true,
  }); */

  return (
    <Box className="cart-items">
      <Box className="image-box">
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
      <Box
        className="counter"
      >
        <Box
          className="btn"
          color={useColorModeValue('gray.600', 'gray.300')}
          bg={useColorModeValue('gray.100', 'gray.600')}
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        >
          +
        </Box>
        <Box
          className="count"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {item.quantity}
        </Box>
        <Box
          className="btn"
          color={useColorModeValue('gray.600', 'gray.300')}
          bg={useColorModeValue('gray.100', 'gray.600')}
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        >
          -
        </Box>
      </Box>
      <Box className="prices">
        <Box
          className="amount"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {`${item.product.price}$`}
        </Box>
        <Box
          className="remove"
          color={useColorModeValue('red.500', 'red.400')}
        >
          <Text>Remove</Text>
        </Box>
      </Box>
    </Box>
  );
};
