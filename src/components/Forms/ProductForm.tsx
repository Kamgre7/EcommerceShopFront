import React from 'react';
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
  Textarea, Select,
} from '@chakra-ui/react';

export const ProductForm = () => {
  console.log('test');
  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Add new product to shop</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              name: '',
              description: '',
              quantity: 1,
              price: 1,
              sku: '',
              categoryId: '',
              img: '',
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
              console.log(values.img);
            }}
          >
            {({
              handleSubmit, errors, touched, setFieldValue,
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
                              error = 'First name cannot be longer than 25 characters';
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
                            } else if (value <= 0) {
                              error = 'Quantity should be grater than 0';
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
                          validate={(value:string | number) => {
                            let error;
                            if (value === '') {
                              error = 'Category is required';
                            }
                            return error;
                          }}
                        >
                          <option>Laptop</option>
                          <option>Smartphone</option>
                          <option>TV and audio</option>
                          <option>Smarthome</option>
                          <option>Accessory</option>

                        </Field>
                        <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                      </FormControl>

                      <FormControl mb="15px">
                        <FormLabel htmlFor="img">Img</FormLabel>
                        <input
                          id="img"
                          name="img"
                          type="file"
                          accept="image/*"
                          onChange={(e: React.FormEvent<HTMLInputElement>) => setFieldValue('img', (e.target as HTMLInputElement).files![0])}
                        />
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
                            } else if (value.length >= 25) {
                              error = 'Description cannot be longer than 25 characters';
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
                      Add product
                    </Button>
                  </Stack>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};
