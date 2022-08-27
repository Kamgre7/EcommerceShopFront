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
  Text,
  useColorModeValue, FormErrorMessage, VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  console.log('asdsad');
  return (
    <Flex
/*
      minH="100vh"
*/
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg">
            to buy our best products!
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
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      validate={(value:string) => {
                        let error;

                        if (value.length <= 5) {
                          error = 'Password must contain at least 6 characters';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Stack
                    spacing={10}
                    w="100%"
                    align="start"
                    justify="start"
                  >
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align="start"
                      justify="space-between"
                      w="100%"
                    >
                      <Text
                        fontSize="md"
                        _hover={{
                          color: 'blue.500',
                        }}
                      >
                        <Link to="/">
                          Register
                        </Link>
                      </Text>
                      <Text
                        fontSize="md"
                        _hover={{
                          color: 'blue.500',
                        }}
                      >
                        <Link to="/">
                          Forgot password?
                        </Link>
                      </Text>
                    </Stack>
                    <Button
                      type="submit"
                      bg="blue.400"
                      color="white"
                      width="full"
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign in
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
