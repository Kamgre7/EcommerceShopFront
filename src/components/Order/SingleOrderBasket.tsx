import {
  Flex, Box, Image, Heading, useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BasketFilterResponse } from 'types';

interface Props {
  item: BasketFilterResponse
}

export const SingleOrderBasket = ({ item }: Props) => {
  const { product, quantity } = item;
  const imgLink = `http://localhost:3001/product/photo/${product.id}`;

  return (
    <Flex
      height="10vh"
      className="cart-items"
    >
      <Box width="15%">
        <Image
          src={imgLink}
          alt={product.name}
          align="center"
          w="60%"
          h={{ base: '100%', sm: '60%', lg: '80%' }}
        />
      </Box>
      <Box
        width="20%"
      >
        <Link to={`/product/${product.id}`}>
          <Heading
            size="md"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            {product.name}
          </Heading>
        </Link>
      </Box>
      <Flex
        fontSize="md"
      >
        <Box
          color={useColorModeValue('gray.600', 'gray.300')}
          className="count"
          fontSize="md"
        >
          {`${quantity}x`}
        </Box>
      </Flex>
      <Flex
        justify="center"
        align="center"
      >
        <Flex
          color={useColorModeValue('gray.600', 'gray.300')}
          className="amount"
          fontSize="md"
          alignSelf="flex-end"
        >
          {`${product.price}$`}
        </Flex>
      </Flex>

    </Flex>
  );
};
