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
import { registerUser } from '@/api/auth/authSlice';

export default function SignUp({ onClose, onOpen }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    last: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too short')
      .required('Required')
      .matches(
        "^([A-Z\\u00C0-\\u00D6\\u00D8-\\u00DE])([a-z\\u00DF-\\u00F6\\u00F8-\\u00FF '&-]+)$",
        'Start with a capital letter and numbers are not allawed'
      ),
    last: Yup.string()
      .min(3, 'Too short')
      .required('Required')
      .matches(
        "^([A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00DE\\u00DF-\\u00F6\\u00F8-\\u00FF '&-]+)$",
        ' Start with a capital letter and numbers are not allawed'
      ),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    password: Yup.string()
      .min(8, 'passwords must be at least 8 characters long')
      .max(30, 'Too long!')
      .required('Required')
      .matches(
        // '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
        '^(?=.*\\d)(?=.*[a-z]).{8,}$',
        'Must contain at least 8 characters and one number'
      ),
  });

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(registerUser({ email: values.email, password: values.password, values: values }));
      setSubmitting(false);
      onClose();
      dispatch(closeModal());
    } catch (error) {
      setSubmitting(false);
      setErrors({ auth: 'You already have an account with these credentials' });
      console.log(error);
    }
  };
  

  return (
    <ModalWindow>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={6} mx={'auto'} maxW={'lg'} px={6}>
          {/* <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Hi there !
            </Heading>
            <Text fontSize={'sm'} color={'gray.600'} textAlign="center">
              Register to get full access or login <br /> if you already have an
              account ✌️
            </Text>
          </Stack> */}
          <Box rounded={'lg'} p={10} pb={5}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <Flex gap={3}>
                    {' '}
                    <MyTextInput label="Name" name="name" errors={errors} />
                    <MyTextInput
                      label="Last Name"
                      name="last"
                      errors={errors}
                    />
                  </Flex>

                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@xzy.com"
                    errors={errors}
                  />

                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    errors={errors}
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
                    >
                      Sign Up
                    </Button>
                    <Divider my="1em" orientation="horizontal" />
                    <SocialLogin />
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link
                  onClick={() => {
                    dispatch(closeModal());
                    dispatch(openModal({ modalType: 'SignIn' }));
                  }}
                  color={'blue.400'}
                >
                  Sign In
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ModalWindow>
  );
}
