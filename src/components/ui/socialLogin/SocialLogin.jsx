import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { socialLogin } from '@/api/auth/authSlice';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { closeModal } from '@/components/ui/modals/modalSlice';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const handleSocialLogin = provider => {
    dispatch(closeModal());
    dispatch(socialLogin(provider));
  };
  return (
    <>
      <Button
        onClick={() => handleSocialLogin('google')}
        leftIcon={<FaGoogle />}
        colorScheme="red"
        minW="100%"
        size="md"
      >
        Login with Google
      </Button>
      <Button
        onClick={() => handleSocialLogin('facebook')}
        leftIcon={<FaFacebook />}
        marginTop="0.4em"
        colorScheme="facebook"
        width="100%"
        size="md"
      >
        Login with Facebook
      </Button>
    </>
  );
};

export default SocialLogin;
