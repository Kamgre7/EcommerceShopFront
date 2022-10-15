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
  Text,
  useColorModeValue, FormErrorMessage, VStack, InputGroup, InputRightElement, IconButton, useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { UserEditPwdInterface } from 'types';

export const UserEditPwdForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const pwdVisibility = () => (showPassword ? setShowPassword(false) : setShowPassword(true));
  const newPwdVisibility = () => (showNewPassword ? setShowNewPassword(false) : setShowNewPassword(true));

  const toast = useToast();

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={6} px={6}>
        <Stack align="center">
          <Text fontSize="lg">
            Change a password
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
              currentPassword: '',
              newPassword: '',
            }}
            onSubmit={async (values) => {
              const res = await fetch('http://localhost:3001/user/edit/password', {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values),
              });

              const data:UserEditPwdInterface = await res.json();

              if (!data.isSuccess) {
                toast({
                  title: data.message,
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: 'Congratulations! You have changed your password',
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
                      <FormControl isInvalid={!!errors.currentPassword && touched.currentPassword}>
                        <FormLabel htmlFor="currentPassword">Current password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            id="currentPassword"
                            name="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            mb={4}
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
                        <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
                        <FormLabel htmlFor="newPassword">New password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            id="newPassword"
                            name="newPassword"
                            mb={4}
                            type={showNewPassword ? 'text' : 'password'}
                            validate={(value:string) => {
                              let error;

                              if (value.length <= 5) {
                                error = 'Password must contain at least 6 characters';
                              }

                              return error;
                            }}
                          />
                          <InputRightElement width="4.5rem" right={{ base: '-20px', md: '-15px' }}>
                            <IconButton aria-label="Show password" icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />} onClick={newPwdVisibility} />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
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
                      Change password
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
