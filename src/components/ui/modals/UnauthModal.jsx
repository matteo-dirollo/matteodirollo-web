import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from './modalSlice';
import { useRouter } from 'next/router';

export default function UnauthModal() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleClose = () => {
    setOpen(false);
    router.back();
  }

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Please either login or register to see this content
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Button
              mx={3}
              colorScheme="teal"
              onClick={() => {
                dispatch(openModal({ modalType: 'SignIn' }));
              }}
            >
              Sign In
            </Button>{' '}
            or{' '}
            <Button
              mx={3}
              colorScheme="pink"
              onClick={() => {
                dispatch(
                  openModal({
                    modalType: 'SignUp',
                  })
                );
              }}
            >
              Sign Up
            </Button>
          </Center>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onClose()
              dispatch(closeModal({ modalType: 'PleaseLogin' }));
            }}
          >
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
