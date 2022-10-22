import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Center, Flex, Text } from '@chakra-ui/react';
import { ProductFilterResponse } from 'types';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ProductList } from '../components/Product/ProductList';

export const SearchProductView = () => {
  const [products, setProducts] = useState<ProductFilterResponse[] | null>(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/product/find/${searchTerm}`);
      const data:ProductFilterResponse[] = await res.json();

      setProducts(data);
    })();
  });

  if (products === null) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      direction="column"
    >
      <Center>
        <Text fontSize="lg" mt="1rem">{`You are looking for: ${searchTerm}`}</Text>
      </Center>

      {
            products.length === 0 && (
            <Text>Sorry, we dont have product with this name </Text>
            )
      }

      { products.length > 0
        && <ProductList products={products} />}

    </Flex>
  );
};
