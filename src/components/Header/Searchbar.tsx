import React, { useState } from 'react';
import {
  IconButton, Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const Searchbar = () => {
  const [searchbarValue, setSearchbarValue] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (name:string):void => {
    setSearchbarValue(name);
  };

  const handleClick = ():void => {
    if (searchbarValue !== '') {
      navigate(`product/find/${encodeURI(searchbarValue)}`, { replace: true });
    }
  };

  return (
    <InputGroup size="md" width="30%">
      <Input
        pr="4.5rem"
        type="text"
        placeholder="What are you looking for?"
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
        value={searchbarValue}
      />
      <InputRightElement
        width="4.5rem"
        right={{ base: '-20px', md: '-15px' }}
      >
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  );
};
