import React from 'react';
import { Text, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const LogoBanner = () => (
  <Text
    textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
    fontFamily="heading"
  >
    <Link to="/">Logo</Link>
  </Text>
);
