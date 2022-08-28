import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaFacebook, FaInstagram, FaTwitter, FaYoutube,
} from 'react-icons/fa';
import React from 'react';
import { SocialButton } from './SocialBtn';

export const Footer = () => (
  <Box
    borderTopWidth={1}
    borderStyle="solid"
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    bg={useColorModeValue('gray.50', 'gray.900')}
    color={useColorModeValue('gray.700', 'gray.200')}
    width="100%"
  >
    <Container
      as={Stack}
      maxW="6xl"
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-around' }}
      align={{ base: 'center', md: 'center' }}
    >
      <Text>© 2022 Kamgre7 All rights reserved</Text>
      <Stack direction="row" spacing={6}>
        <SocialButton label="Facebook" href="#" iconColor="blue">
          <FaFacebook />
        </SocialButton>
        <SocialButton label="Twitter" href="#" iconColor="blue">
          <FaTwitter />
        </SocialButton>
        <SocialButton label="YouTube" href="#" iconColor="red">
          <FaYoutube />
        </SocialButton>
        <SocialButton label="Instagram" href="#" iconColor="yellow">
          <FaInstagram />
        </SocialButton>
      </Stack>
    </Container>
  </Box>
);
