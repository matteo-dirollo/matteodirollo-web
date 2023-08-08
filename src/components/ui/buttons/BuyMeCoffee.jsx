import { Box, Image } from '@chakra-ui/react';

import React from 'react';

const BuyMeCoffee = () => {
  return (
    <Box
      marginTop="0.8em"
      target="_blank"
      rel="noreferrer"
      href="https://www.buymeacoffee.com/matteodiro3"
      as="a"
      w={{ sm: '10em', base: '8em' }}
    >
      <Image src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=matteodiro3&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff" />
    </Box>
  );
};

export default BuyMeCoffee;
