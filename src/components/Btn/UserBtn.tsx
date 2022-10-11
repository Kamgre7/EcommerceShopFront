import React from 'react';
import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider, useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutResponse } from 'types';
import { useAuth } from '../../hooks/useAuth';

const MENU_LINKS = [
  {
    name: 'Order',
    url: '/order/history',
  },
  {
    name: 'Settings',
    url: 'user/edit',
  },
];

export const UserBtn = () => {
  const { signOut } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutUser = async ():Promise<void> => {
    try {
      const res = await fetch('http://localhost:3001/auth/logout', {
        credentials: 'include',
      });

      const data:LogoutResponse = await res.json();

      if (!data.isSuccess) {
        toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        signOut();
        navigate('/', { replace: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton
          as={Button}
          rounded="full"
          variant="link"
          cursor="pointer"
          minW={0}
        >
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          />
        </MenuButton>
        <MenuList>
          {
            MENU_LINKS.map((link) => (
              <Link to={link.url} key={link.url}>
                <MenuItem key={link.url}>{link.name}</MenuItem>
              </Link>
            ))
          }
          <MenuDivider />
          <MenuItem onClick={logoutUser}> Logout </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
