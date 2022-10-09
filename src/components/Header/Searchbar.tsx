import React from 'react';
import {
  IconButton, Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface Props {
  handleClick: () => void
}

export const Searchbar = ({ handleClick }: Props) => (
  <InputGroup size="md" width="30%">
    <Input
      pr="4.5rem"
      type="text"
      placeholder="What are you lookiang for?"
    />
    <InputRightElement width="4.5rem" right={{ base: '-20px', md: '-15px' }}>
      <IconButton aria-label="Search database" icon={<SearchIcon />} onClick={handleClick} />
    </InputRightElement>
  </InputGroup>
);
