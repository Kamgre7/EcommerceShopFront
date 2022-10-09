import React from 'react';
import {
  Button,
  Flex,
  FormControl, FormErrorMessage,
  FormLabel, Heading,
  Input,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import './CreditCardForm.css';

export interface UserInfo {
  creditCard: string;
  expDate: string;
  creditCardCvv: string;
}

interface Props {
  checkoutUserInfo: (userInfo:UserInfo) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CreditCardForm = ({ checkoutUserInfo }: Props) => (
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
            cardholderName: '',
            creditCard: '',
            expDate: '',
            creditCardCvv: '',
          }}
          onSubmit={(values) => {
            const cardExpiryMonth = new Date(values.expDate).getMonth() + 1;
            const cardExpiryYear = String((new Date(values.expDate).getFullYear())).slice(-2);

            checkoutUserInfo({
              creditCard: String(values.creditCard),
              creditCardCvv: String(values.creditCardCvv),
              expDate: `${cardExpiryMonth}/${cardExpiryYear}`,
            });
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.cardholderName && touched.cardholderName}>
                  <FormLabel htmlFor="cardholderName">Cardholder Name</FormLabel>
                  <Field
                    as={Input}
                    id="cardholderName"
                    name="cardholderName"
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

                      if (value.length > 255) {
                        error = 'Cardholder name cannot be longer than 255 characters';
                      } else if (value.length <= 5) {
                        error = 'Cardholder name must contain at least 5 characters';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.cardholderName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.creditCard && touched.creditCard}>
                  <FormLabel htmlFor="creditCard">Card number</FormLabel>
                  <Field
                    as={Input}
                    id="creditCard"
                    name="creditCard"
                    type="number"
                    border={0}
                    borderBottom="1.5px solid #ccc"
                    padding="0 0.5rem"
                    color="grey.500"
                    outline="none"
                    fontSize="1.1rem"
                    fontWeight={500}
                    mb={5}
                    validate={(value:number) => {
                      let error;

                      if (value <= 1000000) {
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
                      type="date"
                      border={0}
                      borderBottom="1.5px solid #ccc"
                      padding="0 0.5rem"
                      color="grey.500"
                      outline="none"
                      fontSize="1.1rem"
                      fontWeight={500}
                      mb={5}
                      validate={(value:Date) => {
                        let error;

                        if (!value) {
                          error = 'Expiry date is required';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.expDate}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.creditCardCvv && touched.creditCardCvv}>
                    <FormLabel htmlFor="creditCardCvv" className="expcvv_text2">CVV</FormLabel>
                    <Field
                      as={Input}
                      id="creditCardCvv"
                      name="creditCardCvv"
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
                          error = 'CVV contains only 3 characters';
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.creditCardCvv}</FormErrorMessage>
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
