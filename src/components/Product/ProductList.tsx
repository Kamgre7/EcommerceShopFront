import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ProductFilterResponse } from 'types';
import { SingleProduct } from './SingleProduct';

interface Props {
  products: ProductFilterResponse[]
}

export const ProductList = ({ products }: Props) => (
  <Flex
    direction="column"
    justify="flex start"
    maxW={{ xl: '1200px' }}
    minW="50vw"
    m="0 auto"
  >
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="flex-start"
    >
      {products.map((singleProduct) => (
        <Box m="0 1rem" key={singleProduct.id}>
          <SingleProduct key={singleProduct.id} product={singleProduct} />
        </Box>
      ))}
    </Flex>
  </Flex>
);
