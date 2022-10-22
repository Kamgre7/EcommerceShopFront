import React, { useState } from 'react';
import {
  Box, Button,
  Flex,
  FormControl, FormErrorMessage,
  FormLabel, IconButton,
  Input,
  InputGroup, InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';

type LocationProps = {
  state: {
    from: Location;
    email: string;
  }
};

export const RecoverPasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const pwdVisibility = () => (showPassword ? setShowPassword(false) : setShowPassword(true));
  const newPwdVisibility = () => (showNewPassword ? setShowNewPassword(false) : setShowNewPassword(true));
  const location = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = location;

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" py={6} px={6}>
        <Stack align="center">
          <Text fontSize="lg">
            Recover a password
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
              newPassword: '',
              reTypePwd: '',
            }}
            onSubmit={async (values) => {
              if (values.newPassword !== values.reTypePwd) {
                toast({
                  title: 'New password and re-typed password must be the same',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                const res = await fetch('http://localhost:3001/user/recover-password', {
                  method: 'PUT',
                  credentials: 'include',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify({
                    email: state.email,
                    pwd: values.newPassword,
                  }),
                });

                const data = await res.json();

                if (!data.isSuccess) {
                  toast({
                    title: data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  navigate('/login', { replace: true });
                }
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Flex direction="column">
                      <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
                        <FormLabel htmlFor="newPassword">New password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            id="newPassword"
                            name="newPassword"
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
                        <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.reTypePwd && touched.reTypePwd}>
                        <FormLabel htmlFor="reTypePwd">Re-type password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            id="reTypePwd"
                            name="reTypePwd"
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
                        <FormErrorMessage>{errors.reTypePwd}</FormErrorMessage>
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
                      Set password
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
