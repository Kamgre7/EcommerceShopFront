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
  useColorModeValue, FormErrorMessage, VStack, InputGroup, InputRightElement, IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const pwdVisibility = () => (showPassword ? setShowPassword(false) : setShowPassword(true));

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
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
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
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
                      <InputRightElement width="4.5rem" right="-15px">
                        <IconButton aria-label="Show password" icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} onClick={pwdVisibility} />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
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
