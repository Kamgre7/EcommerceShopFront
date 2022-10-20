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
  useColorModeValue,
  FormErrorMessage,
  VStack,
  useToast, Textarea,
} from '@chakra-ui/react';
import { CreateCategoryResponse } from 'types';
import { useNavigate } from 'react-router-dom';

export const CategoryForm = () => {
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
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Add new product to shop</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              name: '',
              description: '',
              photo: '',
            }}
            onSubmit={async (values) => {
              const formData = new FormData();

              for (const [key, value] of Object.entries(values)) {
                if (key !== 'photo') {
                  formData.append(key, String(value));
                } else {
                  formData.append('photo', values.photo);
                }
              }

              try {
                const res = await fetch('http://localhost:3001/category/', {
                  method: 'POST',
                  credentials: 'include',
                  body: formData,
                });

                const data:CreateCategoryResponse = await res.json();
                if ('isSuccess' in data) {
                  toast({
                    title: data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: `Category ${data.name} was successfully created`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  navigate('/admin', { replace: true });
                }
              } catch (err) {
                if (err instanceof Error) {
                  console.error(err.message);
                }
              }
            }}
          >
            {({
              handleSubmit, errors, touched, setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="center">
                  <Flex direction="column">
                    <FormControl isInvalid={!!errors.name && touched.name} mb="15px">
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        validate={(value:string) => {
                          let error;

                          if (value.length <= 2) {
                            error = 'Name must contain at least 3 characters';
                          } else if (value.length >= 25) {
                            error = 'Name cannot be longer than 25 characters';
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.description && touched.description} mb="15px">
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        type="text"
                        width="100%"
                        height="85%"
                        validate={(value:string) => {
                          let error;

                          if (value.length <= 2) {
                            error = 'Description must contain at least 3 characters';
                          } else if (value.length >= 1500) {
                            error = 'Description cannot be longer than 1500 characters';
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>

                    <FormControl mb="15px">
                      <FormLabel htmlFor="photo">Photo</FormLabel>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setFieldValue('photo', (e.target as HTMLInputElement).files![0])}
                      />
                    </FormControl>

                  </Flex>
                  <Stack
                    spacing={10}
                    w="100%"
                    align="start"
                    justify="start"
                  >
                    <Button
                      type="submit"
                      bg="green.400"
                      color="white"
                      width="full"
                      _hover={{
                        bg: 'green.500',
                      }}
                    >
                      Add category
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
