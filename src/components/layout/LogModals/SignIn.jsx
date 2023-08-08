import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '@/components/ui/inputs/MyTextInput';
import {
  Button,
  Flex,
  Stack,
  Text,
  Box,
  Link,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '@/components/ui/modals/modalSlice';
import SocialLogin from '@/components/ui/socialLogin/SocialLogin';
import ModalWindow from '@/components/ui/modals/ModalWindow';
import { signInWithEmail } from '@/api/auth/authSlice';

export default function SignIn({ onClose }) {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    password: Yup.string()
      .min(8, 'passwords must be at least 8 characters long')
      .max(30, 'Too long!')
      .required('Required')
      //  '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
      .matches(
        '^(?=.*\\d)(?=.*[a-z]).{8,}$',
        'Must contain at least 8 characters and one number'
      ),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signInWithEmail({ email: values.email, password: values.password }));
      setSubmitting(false);
      dispatch(closeModal());
    } catch (error) {
      setSubmitting(false);
      setErrors({ auth: 'Wrong email or password' });
      console.log(error)
    }
  };

  return (
    <ModalWindow>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        id='login-modal'
      >
        <Stack spacing={6} mx={'auto'} maxW={'lg'} px={6}>
          {/* <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Hi there !
            </Heading>
            <Text fontSize={'sm'} color={'gray.600'} textAlign="center">
              Login to get full access or register <br /> if you haven't done it
              yet ✌️
            </Text>
          </Stack> */}
          <Box rounded={'lg'} p={10} pb={5}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@xzy.com"
                    id='email'
                  />

                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    id='password'
                  />
                  {errors.auth && (
                    <Text color="red.300" fontSize="sm">
                      {errors.auth}
                    </Text>
                  )}
                  <br />

                  <Stack>
                    <Button
                      isLoading={isSubmitting}
                      disable={!isValid || !dirty || isSubmitting}
                      type="submit"
                      colorScheme="teal"
                      width="100%"
                      id='submit-button'
                    >
                      Sign In
                    </Button>
                    <Divider my="1em" orientation="horizontal" />
                    <SocialLogin />
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack pt={6}>
              <Text align={'center'}>
                Not registered?{' '}
                <Link
                  onClick={() => {
                    dispatch(closeModal());
                    dispatch(openModal({ modalType: 'SignUp' }));
                  }}
                  color={'blue.400'}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ModalWindow>
  );
}
