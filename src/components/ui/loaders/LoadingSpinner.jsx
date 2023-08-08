import React from 'react';
import { Center, Flex, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      alignContent={'center'}
      justifyContent={'center'}
    >
      <Center>
        <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
      </Center>
    </Flex>
  );
};

export default LoadingSpinner;
