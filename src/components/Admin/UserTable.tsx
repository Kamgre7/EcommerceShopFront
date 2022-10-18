import React from 'react';
import { UsersList } from '../Table/UsersList';

export const UserTable = () => {
  console.log('admin page');
  return (
    <section>
      <h1>Admin page</h1>
      <p>Must be a admin role</p>
      <p>user component</p>
      <UsersList />
    </section>
  );
};
