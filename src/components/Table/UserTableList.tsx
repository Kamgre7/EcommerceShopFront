import React, { useEffect, useState } from 'react';
import { UserInfoSuccessfulResponse } from 'types';
import {
  Center, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { UserTableRow } from './UserTableRow';

export const UserTableList = () => {
  const [users, setUsers] = useState<UserInfoSuccessfulResponse[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/user', {
          credentials: 'include',
        });
        const data: UserInfoSuccessfulResponse[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (users === null) {
    return <LoadingSpinner />;
  }

  return (
    <Center>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" width="40vw" size="sm">
          <TableCaption>Users list</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Surname</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};
