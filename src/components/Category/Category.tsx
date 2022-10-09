import React from 'react';
import {
  Box, Text, Image, Stack, useColorModeValue, Flex,
} from '@chakra-ui/react';
import { CategoryFilterResponse } from 'types';

interface Props {
  category: CategoryFilterResponse
}

export const Category = ({ category } : Props) => {
  const { name, description, id } = category;
  const imgLink = `http://localhost:3001/category/photo/${id}`;

  return (

    <Box
      maxW={{ xl: '1200px' }}
      minW="50vw"
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      boxShadow="2xl"
      rounded="md"
      p={5}
      mt={5}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          h="210px"
          bg="gray.100"
          mr="20px"
          justify="center"
          align="center"
        >
          <Image
            src={imgLink}
            alt={name}
            fit="cover"
            align="center"
            minW="250px"
            rounded={5}
            h={{ base: '100%', sm: '210px', lg: '210px' }}
          />
        </Flex>
        <Stack>
          <Text
            textTransform="uppercase"
            fontWeight={800}
            fontSize="sm"
            letterSpacing={1.1}
          >
            {name}
          </Text>
          <Text>
            {description}
          </Text>
        </Stack>
      </Flex>
    </Box>

  );
};
