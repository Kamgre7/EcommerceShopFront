import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  VStack,
  Textarea, Select, useToast,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditProductInfoResponse } from 'types';
import { ShopContext } from '../../context/shop.context';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { SingleProductDetailsInterface } from '../Product/SingleProductDetails';

export const ProductEditForm = () => {
  const [productInfo, setProductInfo] = useState<SingleProductDetailsInterface | null>(null);
  const { id: productId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/product/${productId}`, {
          credentials: 'include',
        });
        const data:SingleProductDetailsInterface = await res.json();
        setProductInfo(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const { categories } = context;

  if (productInfo === null) {
    return <LoadingSpinner />;
  }

  const {
    price, sku, name, description, productInventory, category,
  } = productInfo;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Edit product</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              name,
              description,
              quantity: productInventory.quantity,
              price,
              sku,
              categoryId: category.id,
            }}
            onSubmit={async (values) => {
              try {
                const res = await fetch('http://localhost:3001/product/edit', {
                  method: 'PATCH',
                  credentials: 'include',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify({
                    id: productId,
                    ...values,
                  }),
                });

                const data:EditProductInfoResponse = await res.json();

                if (data.isSuccess) {
                  toast({
                    title: data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  navigate('/admin', { replace: true });
                } else {
                  toast({
                    title: data.message,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                  });
                }
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({
              handleSubmit, errors, touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Flex direction="column">
                      <FormControl isInvalid={!!errors.name && touched.name} mb="15px">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'Name must contain at least 3 characters';
                            } else if (value.length >= 25) {
                              error = 'Name cannot be longer than 25 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.price && touched.price} mb="15px">
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <Field
                          as={Input}
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          validate={(value:string | number) => {
                            let error;
                            if (value === '') {
                              error = 'Price is required';
                            } else if (value <= 0) {
                              error = 'Price should be grater than 0';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.quantity && touched.quantity} mb="15px">
                        <FormLabel htmlFor="quantity">Quantity</FormLabel>
                        <Field
                          as={Input}
                          id="quantity"
                          name="quantity"
                          type="number"
                          validate={(value:string | number) => {
                            let error;
                            if (value === '') {
                              error = 'Quantity is required';
                            } else if (value <= 0 || value > 5000) {
                              error = 'Quantity should be grater than 0 and lower than 5000';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.sku && touched.sku}>
                        <FormLabel htmlFor="sku">SKU</FormLabel>
                        <Field
                          as={Input}
                          id="sku"
                          name="sku"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'SKU must contain at least 3 characters';
                            } else if (value.length >= 25) {
                              error = 'SKU cannot be longer than 10 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.sku}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.categoryId && touched.categoryId} mb="15px">
                        <FormLabel htmlFor="categoryId">Category</FormLabel>
                        <Field
                          as={Select}
                          id="categoryId"
                          name="categoryId"
                          type="select"
                          placeholder="Select category"
                          validate={(value:string) => {
                            let error;
                            if (value === '') {
                              error = 'Category is required';
                            }
                            return error;
                          }}
                        >
                          {
                            categories.map((singleCategory) => <option key={singleCategory.id} value={singleCategory.id}>{singleCategory.name}</option>)
                          }

                        </Field>
                        <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                      </FormControl>
                    </Flex>

                    <Flex ml={{ base: '0', md: '20px' }}>
                      <FormControl isInvalid={!!errors.description && touched.description} mb="15px">
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          type="text"
                          width="100%"
                          height="85%"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'Description must contain at least 3 characters';
                            } else if (value.length >= 1500) {
                              error = 'Description cannot be longer than 1500 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Stack
                    spacing={10}
                    w="100%"
                    align="start"
                    justify="start"
                  >
                    <Button
                      type="submit"
                      bg="green.400"
                      color="white"
                      width="full"
                      _hover={{
                        bg: 'green.500',
                      }}
                    >
                      Save product
                    </Button>
                  </Stack>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Stack>
      <Link to="/admin">
        <Button>Go back to admin page </Button>
      </Link>
    </Flex>
  );
};
