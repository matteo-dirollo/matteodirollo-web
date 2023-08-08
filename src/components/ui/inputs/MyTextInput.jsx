import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

export default function MyTextInput({ errors, label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel
        marginTop="12px"
        color={useColorModeValue('gray.700', 'gray.100')}
      >
        {label}
      </FormLabel>
      <Input
        variant="filled"
        sx={{
          borderRadius: 0,
          borderWidth: '1px',
          // borderColor: 'gray.300',
          _focus: {
            borderColor: 'teal.300',
            borderWidth: '2px', // Change the border weight for the :focus state
          },
        }}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
