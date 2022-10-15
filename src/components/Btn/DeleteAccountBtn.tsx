import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, useColorModeValue,
  useDisclosure, useToast,
} from '@chakra-ui/react';
import { UserDeleteAccount } from 'types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const DeleteAccountBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signOut } = useAuth();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const confirmedDelete = async ():Promise<void> => {
    const userId = user?.id;
    signOut();
    const res = await fetch(`http://localhost:3001/user/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data:UserDeleteAccount = await res.json();

    if (data.isSuccess) {
      toast({
        title: 'Account deleted successfully',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      navigate('/', { replace: true });
    } else {
      toast({
        title: data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    onClose();
  };

  return (
    <>
      <Button
        size="md"
        bgColor={useColorModeValue('red.300', 'red.400')}
        _hover={{
          bgColor: 'red.400',
        }}
        mt={10}
        onClick={onOpen}
      >
        Delete account
      </Button>

      <AlertDialog
        isOpen={isOpen}
          // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              {'Are you sure? You can\'t undo this action afterwards.'}
            </AlertDialogBody>

            <AlertDialogFooter>

              <Button
                  // @ts-ignore
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmedDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
