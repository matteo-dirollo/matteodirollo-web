import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  HStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MdEmail } from 'react-icons/md';
import { FaMastodon } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import MyTextInput from '../../components/ui/inputs/MyTextInput';
import TextareaInput from '../../components/ui/inputs/TextareaInput';
import { db } from '../../api/firebase-config.js';


const ContactForm = () => {
  const toast = useToast();
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const emailToColor = useColorModeValue('teal.100', 'teal.500');
  const buttonColor = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverColor = useColorModeValue('teal.600', 'teal.400');
  const tastSuccess = () => {
    toast({
      title: 'Messsage sent.',
      description: 'Your message has been sent',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    message: '',
  };

  const handleClick = () => {
    window.location.href = 'mailto:matteo.dirollo@icloud.com';
  };

  const collectData = async values => {
    const contactsPageCollectionRef = collection(db, 'Contact_Form');
    await addDoc(contactsPageCollectionRef, {
      name: values.name,
      surname: values.surname,
      email: values.email,
      message: values.message,
      time: Timestamp.now(),
    });
  };
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Too short!').required('Required'),
    surname: Yup.string().min(3, 'Too short!').required('Required'),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    message: Yup.string().min(10, 'Too short!').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await collectData(values);
      resetForm();
      tastSuccess();
    } catch (error) {
      toast({
        title: 'An Error occurred.',
        description: 'Something went wrong, try later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Flex
      my={20}
      justifyContent="center"
      flexDirection={['column', 'column', 'row']}
    >
      <Box mx={10} minW={[250, 300, 500]} maxW={700}>
        <Heading color={textColor}>{'Let\'s work together !'}</Heading>
        <Text mt={{ sm: 3, md: 3, lg: 5 }} maxW={700} color={textColor}>
          {'Have a project in mind? Let\'s collaborate and bring it to life! From logos and websites to infographics and animations, I can create captivating designs tailored to your needs. Get in touch today and let\'s make something amazing together!'}
        </Text>

        <Button
          my={{ base: 5, sm: 5, md: 8, lg: 10 }}
          size="md"
          height="48px"
          width="auto"
          variant="ghost"
          color={textColor}
          _hover={{ backgroundColor: emailToColor }}
          border={'2px solid teal'}
          leftIcon={<MdEmail color="teal" size="20px" />}
          onClick={handleClick}
        >
          matteo.dirollo@icloud.com
        </Button>
        <HStack
          mt={{ lg: 10, md: 10 }}
          spacing={5}
          px={5}
          alignItems="flex-start"
        >
          <IconButton
            aria-label="github"
            variant="ghost"
            size="sm"
            isRound={true}
            color={buttonColor}
            _hover={{ color: `${buttonHoverColor}` }}
            icon={<BsGithub size="28px" />}
          />
          <IconButton
            aria-label="Mastodon"
            variant="ghost"
            size="sm"
            isRound={true}
            color={buttonColor}
            _hover={{ color: `${buttonHoverColor}` }}
            icon={<FaMastodon size="28px" />}
          />
        </HStack>
      </Box>

      <Flex
        flexDirection="column"
        justifySelf={'center'}
        spacing={5}
        minW={[180, 250, 500]}
        m={[10, 10, 0]}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, errors }) => (
            <Form>
              <MyTextInput label="Name" name="name" />
              <MyTextInput label="Last Name" name="surname" />
              <MyTextInput
                label="Email"
                name="email"
                placeholder="youremail@xzy.com"
              />
              <TextareaInput label="Message" name="message" />

              {errors.auth && (
                <Text color="red.300" fontSize="sm">
                  {errors.auth}
                </Text>
              )}

              <Button
                isLoading={isSubmitting}
                disable={!isValid || !dirty || isSubmitting}
                type="submit"
                colorScheme="teal"
                minW={200}
                p={5}
                py={7}
                my={6}
              >
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default ContactForm;
