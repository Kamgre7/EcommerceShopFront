import React from 'react';
import {
  Button,
  Td, Tr, useToast,
} from '@chakra-ui/react';
import { UserDeleteAccount, UserInfoSuccessfulResponse } from 'types';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: UserInfoSuccessfulResponse;
}

export const UserTableRow = ({ user }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    firstName, lastName, email, role, id,
  } = user;

  const deleteUser = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/user/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      });
      const data:UserDeleteAccount = await res.json();

      if (data.isSuccess) {
        toast({
          title: 'User deleted successfully',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        navigate('/admin', { replace: true });
      } else {
        toast({
          title: data.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Tr>
      <Td _hover={{
        color: 'red',
      }}
      >
        {firstName}
      </Td>
      <Td>{lastName}</Td>
      <Td>{email}</Td>
      <Td>{role}</Td>
      <Td>
        <Button onClick={deleteUser}><DeleteIcon /></Button>
      </Td>
    </Tr>
  );
};
