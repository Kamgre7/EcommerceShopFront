import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading, Input,
  Select,
  Stack,
  useColorModeValue, useToast,
  VStack,
} from '@chakra-ui/react';
import { CheckoutPlaceOrderResponse, UserAddressInterface } from 'types';
import { Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';

export const OrderView = () => {
  const [userAddress, setUserAddress] = useState<UserAddressInterface[] | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/user/address', {
        credentials: 'include',
      });
      const data:UserAddressInterface[] = await res.json();
      setUserAddress(data);
    })();
  }, []);

  if (userAddress === null) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={5} maxW="lg" py={10}>
        <Flex
          direction="column"
          rounded="lg"
          border={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.500')}
          p={8}
          justify="center"
          align="center"
          borderRadius="1.5rem"
          boxShadow="2xl"
        >
          <Heading as="h3" size="md" mb={5}>Payment information</Heading>
          <Formik
            initialValues={{
              userAddressId: '',
              creditCard: '',
              expDate: '',
              creditCardCvc: '',
            }}
            onSubmit={async (values) => {
              try {
                const res = await fetch('http://localhost:3001/checkout/order', {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(values),
                });

                const data:CheckoutPlaceOrderResponse = await res.json();
                if (data.isSuccess) {
                  toast({
                    title: data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  navigate('/order/history', { replace: true });
                } else {
                  toast({
                    title: data.message,
                    status: 'error',
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
                  <FormControl isInvalid={!!errors.userAddressId && touched.userAddressId}>
                    <FormLabel htmlFor="userAddressId">Delivery address</FormLabel>
                    <Field
                      as={Select}
                      id="userAddressId"
                      name="userAddressId"
                      type="select"
                      placeholder="Select delivery address"
                      border={0}
                      borderBottom="1.5px solid #ccc"
                      padding="0 0.5rem"
                      color="grey.500"
                      outline="none"
                      fontSize="1.1rem"
                      fontWeight={500}
                      mb={5}
                      validate={(value:string) => {
                        let error;

                        if (value === '') {
                          error = 'Delivery address is required';
                        }
                        return error;
                      }}
                    >
                      {
                            userAddress.map((address) => (
                              <option key={address.id} value={address.id}>
                                {` 
                                ${address.address}
                                ${address.city}
                                ${address.postalCode}
                                ${address.country}
                                ${address.mobilePhone}
                                `}
                              </option>
                            ))
                      }

                    </Field>
                    <FormErrorMessage>{errors.userAddressId}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.creditCard && touched.creditCard}>
                    <FormLabel htmlFor="creditCard">Card number</FormLabel>
                    <Field
                      as={Input}
                      id="creditCard"
                      name="creditCard"
                      type="text"
                      border={0}
                      borderBottom="1.5px solid #ccc"
                      padding="0 0.5rem"
                      color="grey.500"
                      outline="none"
                      fontSize="1.1rem"
                      fontWeight={500}
                      mb={5}
                      validate={(value:string) => {
                        let error;

                        if (value.length < 6) {
                          error = 'Credit card must contain at least 6 characters';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.creditCard}</FormErrorMessage>
                  </FormControl>
                  <Flex className="expcvv">
                    <FormControl isInvalid={!!errors.expDate && touched.expDate} margin="0 20px">
                      <FormLabel htmlFor="expDate" className="expcvv_text">Expiry date</FormLabel>
                      <Field
                        as={Input}
                        id="expDate"
                        name="expDate"
                        type="string"
                        border={0}
                        borderBottom="1.5px solid #ccc"
                        padding="0 0.5rem"
                        color="grey.500"
                        outline="none"
                        fontSize="1.1rem"
                        fontWeight={500}
                        mb={5}
                        placeholder="MM/YY"
                        validate={(value:string) => {
                          let error;

                          if (value.length !== 5) {
                            error = 'Expiry date contains 5 characters';
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.expDate}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.creditCardCvc && touched.creditCardCvc}>
                      <FormLabel htmlFor="creditCardCvc" className="expcvv_text2">CVV</FormLabel>
                      <Field
                        as={Input}
                        id="creditCardCvc"
                        name="creditCardCvc"
                        type="password"
                        border={0}
                        borderBottom="1.5px solid #ccc"
                        padding="0 0.5rem"
                        color="grey.500"
                        outline="none"
                        fontSize="1.1rem"
                        fontWeight={500}
                        validate={(value:string) => {
                          let error;

                          if (value.length !== 3) {
                            error = 'CVC contains only 3 characters';
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.creditCardCvc}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Button
                    type="submit"
                    bg="blue.400"
                    color="white"
                    width="full"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    className="button"
                  >
                    Checkout
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Flex>
      </Stack>
    </Flex>
  );
};
