import React, { useEffect, useState } from 'react';
import { UserInfoSuccessfulResponse } from 'types';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const UsersList = () => {
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
    <div>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>

            {users.map((user) => (
              <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>
            ))}
          </ul>
        )
        : <div>NO users to display</div>}
    </div>
  );
};
