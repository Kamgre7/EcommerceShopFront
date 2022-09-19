import React, { useState } from 'react';
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
  Text,
  useColorModeValue, FormErrorMessage, VStack, InputGroup, InputRightElement, IconButton, useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const pwdVisibility = () => (showPassword ? setShowPassword(false) : setShowPassword(true));
  const toast = useToast();
  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign up to your account</Heading>
          <Text fontSize="lg">
            and enjoy our store!
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              address: '',
              city: '',
              postalCode: '',
              country: '',
              mobilePhone: '',
            }}
            onSubmit={async (values) => {
              const res = await fetch('http://localhost:3001/user/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values),
              });

              const data = await res.json();
              console.log(data);
              if (data.isSuccess === false) {
                toast({
                  title: 'Account with this email is already registered!',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: `Congratulations! Account ${data.email} was created successfully!`,
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
                    <Flex direction="column">
                      <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                        <FormLabel htmlFor="firstName">First name</FormLabel>
                        <Field
                          as={Input}
                          id="firstName"
                          name="firstName"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'First name must contain at least 3 characters';
                            } else if (value.length >= 25) {
                              error = 'First name cannot be longer than 25 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
                        <Field
                          as={Input}
                          id="lastName"
                          name="lastName"
                          type="text"
                          validate={(value:string) => {
                            let error;

                            if (value.length <= 2) {
                              error = 'Last name must contain at least 3 characters';
                            } else if (value.length >= 25) {
                              error = 'Last name cannot be longer than 25 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.email && touched.email}>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          validate={(value:string) => {
                            let error;

                            if (!value.includes('@')) {
                              error = 'Email address must contain @';
                            } else if (value.length <= 5) {
                              error = 'Email must contain at least 6 characters';
                            } else if (value.length > 255) {
                              error = 'Email cannot be longer than 255 characters';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.password && touched.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            validate={(value:string) => {
                              let error;

                              if (value.length <= 5) {
                                error = 'Password must contain at least 6 characters';
                              }

                              return error;
                            }}
                          />
                          <InputRightElement width="4.5rem" right={{ base: '-20px', md: '-15px' }}>
                            <IconButton aria-label="Show password" icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} onClick={pwdVisibility} />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    </Flex>
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
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
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
                      Sign up
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
