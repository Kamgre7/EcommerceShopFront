import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddressRadioGroup } from '../components/Order/AddressRadioGroup';
import { CreditCardForm } from '../components/Forms/CreditCardForm';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';

interface CheckoutInfo {
  userAddressId: string;
  creditCard: string;
  expDate: string;
  creditCardCvv: string;
}

export type UserInfo = Omit<CheckoutInfo, 'userAddressId'>;

export const OrderView = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutInfo>({
    creditCard: '',
    creditCardCvv: '',
    expDate: '',
    userAddressId: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const selectedUserAddress = (userAddressId: string) => {
    setCheckoutData((prev) => (
      {
        ...prev,
        userAddressId,
      }
    ));
  };

  const checkoutUserInfo = async (userInfo:UserInfo) => {
    setLoading(true);
    setCheckoutData((prev) => (
      {
        ...prev,
        creditCard: userInfo.creditCard,
        creditCardCvv: userInfo.creditCardCvv,
        expDate: userInfo.expDate,
      }
    ));
    setLoading(false);
    console.log('order', checkoutData);
    try {
      const res = await fetch('http://localhost:3001/checkout/order', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(checkoutData),
      });

      const data = await res.json();

      if (!data.isSuccess) {
        /* toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        }); */

        console.log(data.message);
      } else {
        /* signIn(data);
        navigate(from, { replace: true }); */

        console.log(data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      direction="column"
    >
      <AddressRadioGroup selectedUserAddress={selectedUserAddress} />
      <CreditCardForm checkoutUserInfo={checkoutUserInfo} />
    </Flex>
  );
};
