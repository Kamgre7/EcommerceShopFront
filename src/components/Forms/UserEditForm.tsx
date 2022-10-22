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
  Text,
  useColorModeValue, FormErrorMessage, VStack, useToast,
} from '@chakra-ui/react';
import { UserInfoSuccessfulResponse } from 'types';

interface Props {
  userInfo: UserInfoSuccessfulResponse
}

export const UserEditForm = ({ userInfo }:Props) => {
  const toast = useToast();
  const { firstName, lastName, email } = userInfo;

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={6} px={6}>
        <Stack align="center">
          <Text fontSize="lg">
            Edit your information
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
              firstName,
              lastName,
              email,
            }}
            onSubmit={async (values) => {
              const res = await fetch('http://localhost:3001/user/edit', {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values),
              });

              const data = await res.json();

              if ('isSuccess' in data) {
                toast({
                  title: 'Account with this email is already registered!',
                  status: 'error',
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
                          mb={4}
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
                          mb={4}
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
                          mb={4}
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
                      Save changes
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
