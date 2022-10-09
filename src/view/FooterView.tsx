import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Footer } from '../components/Footer/Footer';

export const FooterView = () => (
  <Flex alignSelf="flex-end" justifySelf="flex-end" width="100vw" mt="30px">
    <Footer />
  </Flex>
);
