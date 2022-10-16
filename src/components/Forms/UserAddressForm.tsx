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
  useColorModeValue, FormErrorMessage, VStack, useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CreateUserAddressResponse } from 'types';

export const UserAddressForm = () => {
  const toast = useToast();

  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Add new address</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              address: '',
              city: '',
              postalCode: '',
              country: '',
              mobilePhone: '',
            }}
            onSubmit={async (values) => {
              const res = await fetch('http://localhost:3001/user/address', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values),
              });

              const data:CreateUserAddressResponse = await res.json();

              if (data.isSuccess) {
                toast({
                  title: 'New address added!',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
                navigate('user/address', { replace: true });
              } else {
                toast({
                  title: 'Something went wrong. Try again later.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Flex ml={{ base: '0', md: '20px' }} direction={{ base: 'row', md: 'column' }}>
                      <FormControl isInvalid={!!errors.address && touched.address}>
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <Field
                          as={Input}
                          id="address"
                          name="address"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'Address must contain at least 3 characters';
                            } else if (value.length >= 25) {
                              error = 'Address cannot be longer than 255 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.city && touched.city}>
                        <FormLabel htmlFor="city">City</FormLabel>
                        <Field
                          as={Input}
                          id="city"
                          name="city"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'City must contain at least 3 characters';
                            } else if (value.length >= 255) {
                              error = 'City cannot be longer than 25 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.city}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.postalCode && touched.postalCode}>
                        <FormLabel htmlFor="postalCode">Postal code</FormLabel>
                        <Field
                          as={Input}
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'Postal code must contain at least 3 characters';
                            } else if (value.length >= 10) {
                              error = 'Postal code cannot be longer than 25 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.postalCode}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.country && touched.country}>
                        <FormLabel htmlFor="country">Country</FormLabel>
                        <Field
                          as={Input}
                          id="country"
                          name="country"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'Country must contain at least 3 characters';
                            } else if (value.length >= 25) {
                              error = 'Country cannot be longer than 60 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.country}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.mobilePhone && touched.mobilePhone}>
                        <FormLabel htmlFor="mobilePhone">Mobile phone</FormLabel>
                        <Field
                          as={Input}
                          id="mobilePhone"
                          name="mobilePhone"
                          type="number"
                          validate={(value:number) => {
                            let error;

                            if (value <= 100000000 || value >= 999999999) {
                              error = 'Invalid phone number';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.mobilePhone}</FormErrorMessage>
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
                      bg="blue.400"
                      color="white"
                      width="full"
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Add new address
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
