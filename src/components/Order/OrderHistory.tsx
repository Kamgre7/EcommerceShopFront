import React, { useEffect, useState } from 'react';
import { CheckoutOrderHistoryResponse } from 'types';
import { Flex } from '@chakra-ui/react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { SingleOrder } from './SingleOrder';

export const OrderHistory = () => {
  const [orderList, setOrderList] = useState<CheckoutOrderHistoryResponse[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/checkout/order/history', {
        credentials: 'include',
      });

      const data:CheckoutOrderHistoryResponse[] = await res.json();

      if (data) {
        setOrderList(data);
      }
    })();
  }, []);

  if (orderList === null) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      direction="column"
    >
      {
        orderList.map((order) => <SingleOrder key={order.id} order={order} />)
      }
    </Flex>
  );
};
