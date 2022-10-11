import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import {
  Link, useNavigate, useLocation,
} from 'react-router-dom';
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
  useColorModeValue, FormErrorMessage, VStack, InputGroup, IconButton, InputRightElement, useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { LoginResponse } from 'types';
import { useAuth } from '../../hooks/useAuth';

type LocationProps = {
  state: {
    from: Location;
  }
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const pwdVisibility = () => (showPassword ? setShowPassword(false) : setShowPassword(true));

  const { signIn, setErrorMessage } = useAuth();
  const toast = useToast();

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;

  const from = location.state?.from?.pathname || '/';

  return (
    <Flex
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
            onSubmit={async (values) => {
              try {
                const res = await fetch('http://localhost:3001/auth/login', {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(values),
                });

                const data:LoginResponse = await res.json();
                if (!data.isSuccess) {
                  toast({
                    title: data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  signIn(data);
                  navigate(from, { replace: true });
                }
              } catch (err) {
                if (err instanceof Error) {
                  setErrorMessage(err.message);
                } else {
                  setErrorMessage('No server response - login form error');
                }
              }
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
                        <Link to="/register">
                          Register
                        </Link>
                      </Text>
                      <Text
                        fontSize="md"
                        _hover={{
                          color: 'blue.500',
                        }}
                      >
                        <Link to="/restart-password">
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
