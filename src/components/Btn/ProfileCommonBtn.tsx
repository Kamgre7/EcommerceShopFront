import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Center,
} from '@chakra-ui/react';

interface Props {
  linkTo: string;
  bgColor?: string;
  children: JSX.Element | string;
}

export const ProfileCommonBtn = (props: Props) => {
  const { bgColor = 'blue', children, linkTo } = props;

  return (
    <Center>
      <Link to={linkTo}>
        <Button
          display={{ base: 'center', md: 'inline-flex' }}
          fontSize="sm"
          fontWeight={600}
          type="submit"
          bg={`${bgColor}.400`}
          color="white"
          mt={5}
          _hover={{
            bg: `${bgColor}.500`,
          }}
        >
          {children}
        </Button>
      </Link>
    </Center>
  );
};
