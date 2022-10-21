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
  useColorModeValue, FormErrorMessage, VStack, useToast,
} from '@chakra-ui/react';
import { RecoverUserPwdResponse } from 'types';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Forgot your password?</Heading>
          <Text fontSize="lg">
            Dont worry! You can get new one!
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
            }}
            onSubmit={async (values) => {
              const res = await fetch('http://localhost:3001/user/recover-password', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values),
              });

              const data:RecoverUserPwdResponse = await res.json();

              if (!data.isSuccess) {
                toast({
                  title: data.message,
                  status: 'warning',
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                navigate('/recover-password', {
                  replace: true,
                  state: {
                    email: values.email,
                  },
                });
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
                      Request Reset
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
