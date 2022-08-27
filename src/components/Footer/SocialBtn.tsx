import React, { ReactNode } from 'react';
import { chakra, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';

export const SocialButton = ({
  children,
  label,
  href,
  iconColor,
}: {
  children: ReactNode;
  label: string;
  href: string;
  iconColor: string
}) => (
  <chakra.button
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      color: `${iconColor}.500`,
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);
