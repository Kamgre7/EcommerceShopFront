import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex, FormControl, FormErrorMessage, FormLabel,
  Heading,
  Image, Input,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue, useToast,
  VStack,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/all';
import { Field, Formik } from 'formik';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ShopContext } from '../../context/shop.context';

export interface SingleProductDetailsInterface {
  id: string;
  name: string;
  description: string;
  price:number;
  sku: string;
  productInventory: { quantity:number };
  category: { id: string }
}

export const SingleProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState<SingleProductDetailsInterface | null>(null);
  const { id: idRoute } = useParams();

  const context = useContext(ShopContext);

  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/product/${idRoute}`);
        const data: SingleProductDetailsInterface = await res.json();

        setSingleProduct(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (singleProduct === null) {
    return <LoadingSpinner />;
  }

  if (!context) {
    return null;
  }

  const {
    name, price, sku, description, id, productInventory,
  } = singleProduct;

  const { quantity } = productInventory;

  const imgLink = `http://localhost:3001/product/photo/${id}`;

  return (
    <Container maxW="7xl">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded="md"
            alt={name}
            src={imgLink}
            fit="cover"
            align="center"
            w="100%"
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {name}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize="2xl"
            >
              {`$${price} USD`}
            </Text>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize="xl"
            >
              {`In stock: ${quantity}`}
            </Text>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize="l"
            >
              {`SKU: ${sku}`}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction="column"
            divider={(
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            )}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize="2xl"
                fontWeight="300"
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize="lg">
                {description}
              </Text>
            </VStack>
          </Stack>

          <Formik
            initialValues={{
              quantity: 1,
              productId: id,
            }}
            onSubmit={async (values) => {
              try {
                const res = await fetch('http://localhost:3001/basket', {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify({
                    ...values,
                    productId: id,
                  }),
                });

                const data = await res.json();

                if (!data.isSuccess) {
                  toast({
                    title: data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: `${name} added to basket!`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }
              } catch (err) {
                if (err instanceof Error) {
                  console.error(err.message);
                }
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <Stack
                    spacing={10}
                    w="100%"
                    align="start"
                    justify="start"
                  >
                    <Flex
                      width="100%"
                      justify="center"
                      align="center"
                    >
                      <Flex
                        m="10px 20px"
                      >
                        <FormControl isInvalid={!!errors.quantity && touched.quantity} mb="15px">
                          <FormLabel htmlFor="quantity">Quantity</FormLabel>
                          <Field
                            as={Input}
                            id="quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            max="5000"
                            maxW="60px"
                            validate={(value:string | number) => {
                              let error;
                              if (value === '') {
                                error = 'Quantity is required';
                              } else if (value <= 0 || value > 5000) {
                                error = 'aQuantity should be grater than 0 and lower than 5000';
                              }
                              return error;
                            }}
                          />
                          <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                        </FormControl>
                      </Flex>
                      <Flex
                        grow={1}
                      >
                        <Button
                          rounded="none"
                          type="submit"
                          w="full"
                          mt={8}
                          size="lg"
                          py="7"
                          bg={useColorModeValue('gray.900', 'gray.50')}
                          color={useColorModeValue('white', 'gray.900')}
                          textTransform="uppercase"
                          _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                          }}
                        >
                          Add to basket
                        </Button>
                      </Flex>
                    </Flex>
                  </Stack>
                </VStack>
              </form>
            )}
          </Formik>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
