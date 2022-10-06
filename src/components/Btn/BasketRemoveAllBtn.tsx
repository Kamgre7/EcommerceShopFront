import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';

interface Props {
  removeAllItems: (e:React.MouseEvent<HTMLElement>)=>Promise<void>
}

export const BasketRemoveAllBtn = ({ removeAllItems }: Props) => (
  <Button
    size="md"
    bgColor={useColorModeValue('red.300', 'red.400')}
    _hover={{
      bgColor: 'red.400',
    }}
    onClick={removeAllItems}
  >
    Remove all
  </Button>
);
