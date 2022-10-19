import React from 'react';
import {
  Button, Td, Tr, useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProductFilterResponse, RemoveProductResponse } from 'types';

interface Props {
  product: ProductFilterResponse;
}

export const ProductTableRow = ({ product }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    name, id, price, quantity, sku, boughtCounter,
  } = product;

  const deleteProduct = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/product/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      });
      const data:RemoveProductResponse = await res.json();

      if (data.isSuccess) {
        toast({
          title: 'Product deleted successfully',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Something went wrong. Please try again later.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editProduct = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/product/edit/${id}`);
  };

  return (
    <Tr>
      <Td _hover={{
        color: 'red',
      }}
      >
        <Link to={`/product/${id}`}>{name}</Link>
      </Td>
      <Td>{price}</Td>
      <Td isNumeric>{quantity}</Td>
      <Td>{sku}</Td>
      <Td>{boughtCounter}</Td>
      <Td>
        <Button onClick={deleteProduct}><DeleteIcon /></Button>
        <Button onClick={editProduct} ml="5px"><EditIcon /></Button>
      </Td>
    </Tr>
  );
};
