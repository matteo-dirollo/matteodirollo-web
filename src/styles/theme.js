import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Epilogue, sans-serif',
    body: 'Epilogue, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 0,
        borderWidth: '2px',
        borderColor: 'gray.300',
        _focus: {
          borderColor: 'teal.500',
          borderWidth: '4px', // Change the border weight for the :focus state
          boxShadow: 'outline',
        },
      },
    },
  },
});

export default theme;
