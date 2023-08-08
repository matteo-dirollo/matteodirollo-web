import LottieIcon from '@/components/ui/lottieicons/LottieIcon';
import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const ServiceCard = ({ title, description, animationData }) => {
  return (
    <VStack
      maxW="sm"
      // borderWidth="1px"
      // borderRadius="lg"
      p={6}
      m={4}
      // boxShadow="lg"
      width="300px"
      textAlign={'center'}
    >
      <Box w={180} h={180} mb={10}>
        <LottieIcon animationData={animationData} />
      </Box>

      <Text as="h3" fontSize="3xl" fontWeight="600" mb={4}>
        {title}
      </Text>
      <Text fontSize={'sm'}>{description}</Text>
    </VStack>
  );
};

export default ServiceCard;
