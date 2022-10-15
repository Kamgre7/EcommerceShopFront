import React, { useEffect, useState } from 'react';
import { UserInfoResponse, UserInfoSuccessfulResponse } from 'types';
import { Flex } from '@chakra-ui/react';
import { UserEditForm } from '../Forms/UserEditForm';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { UserEditPwdForm } from '../Forms/UserEditPwdForm';
import { AddUserAddressBtn } from '../Btn/AddUserAddressBtn';
import { CurrentAddressBtn } from '../Btn/CurrentAddressBtn';
import { DeleteAccountBtn } from '../Btn/DeleteAccountBtn';

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfoSuccessfulResponse | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/user/${user?.id}`, {
        credentials: 'include',
      });

      const data:UserInfoResponse = await res.json();

      if ('id' in data) {
        setUserInfo(data);
      } else {
        console.log(data.message);
      }
    })();
  }, []);

  if (userInfo === null) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      align="flex-start"
    >
      <UserEditForm userInfo={userInfo} />
      <UserEditPwdForm />

      <Flex
        direction="column"
      >
        <AddUserAddressBtn />
        <CurrentAddressBtn />
        <DeleteAccountBtn />
      </Flex>

    </Flex>
  );
};
