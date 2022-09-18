import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export const LoadingSpinner = () => (
  /* <Box
    position="absolute"
    left="0"
    top="0"
    w="100vw"
    h="100vh"
    zIndex="2"
    bgColor={useColorModeValue('rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.1)')}
  > */
  <Box
    position="absolute"
    left="50%"
    top="50%"
    transform="translate(-50%, -50%)"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="red.500"
      size="xl"
    />
  </Box>
  /* </Box> */
);
