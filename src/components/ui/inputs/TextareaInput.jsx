import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

export default function TextareaInput({ errors, label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel
        color={useColorModeValue('gray.700', 'gray.100')}
        marginTop="12px"
      >
        {label}
      </FormLabel>
      <Textarea
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
        // placeholder="Text here..."
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
