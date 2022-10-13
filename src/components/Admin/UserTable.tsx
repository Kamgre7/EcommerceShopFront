import React from 'react';
import { Users } from '../Users/Users';

export const UserTable = () => {
  console.log('admin page');
  return (
    <section>
      <h1>Admin page</h1>
      <p>Must be a admin role</p>
      <p>user component</p>
      <Users />
    </section>
  );
};
