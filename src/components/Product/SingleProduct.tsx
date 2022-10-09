import React, { useContext } from 'react';
import {
  Box, Center, Heading, Stack, Text, useColorModeValue, Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CategoryFilterResponse, ProductFilterResponse } from 'types';
import { ShopContext } from '../../context/shop.context';

interface Props {
  product: ProductFilterResponse
}

export const SingleProduct = ({ product }: Props) => {
  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  const { categories } = context;

  const {
    name, price, id, category,
  } = product;

  const singleCategory = categories.find((categoryItem) => categoryItem.id === category) as CategoryFilterResponse;

  const imgLink = `http://localhost:3001/product/photo/${id}`;

  return (
    <Center py={12}>
      <Link to={`/product/${id}`}>
        <Box
          role="group"
          p={6}
          maxW="330px"
          w="full"
          bg={useColorModeValue('white', 'gray.650')}
          border="1px"
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'white.400')}
          boxShadow="2xl"
          rounded="lg"
          pos="relative"
          zIndex={1}
        >
          <Box
            rounded="lg"
            mt={-12}
            pos="relative"
            height="230px"
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${imgLink})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              rounded="lg"
              height={230}
              width={282}
              objectFit="cover"
              src={imgLink}
            />
          </Box>
          <Stack pt={10} align="center">
            <Text color="gray.500" fontSize="sm" textTransform="uppercase">
              {singleCategory.name}
            </Text>
            <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
              {name}
            </Heading>
            <Stack direction="row" align="center">
              <Text fontWeight={800} fontSize="xl">
                {`$${price}`}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
};
