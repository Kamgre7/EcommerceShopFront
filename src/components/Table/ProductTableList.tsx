import React, { useEffect, useState } from 'react';
import {
  Center, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import { ProductFilterResponse } from 'types';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ProductTableRow } from './ProductTableRow';

export const ProductTableList = () => {
  const [products, setProducts] = useState<ProductFilterResponse[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/product', {
          credentials: 'include',
        });
        const data: ProductFilterResponse[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (products === null) {
    return <LoadingSpinner />;
  }

  return (
    <Center>
      <TableContainer mt={5}>
        <Table variant="striped" colorScheme="teal" width="40vw" size="sm">
          <TableCaption>Shop product list</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th>SKU</Th>
              <Th>Sold</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              products.map((product) => <ProductTableRow key={product.id} product={product} />)
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};
