import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const BasketBtn = () => (
  <Flex
    justify="center"
    align="center"
  >
    <Link to="/basket">
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        marginLeft="2"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        aria-label="shopping carta"
      />
    </Link>
  </Flex>
);
