import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObject, clearStorage, selectLoading } from '../../../api/firestore/storageSlice';
import {
  appLoaded,
  asyncActionFinish,
  asyncActionStart,
} from '../../../api/asyncSlice';
import LoadingSpinner from '@/components/ui/loaders/LoadingSpinner';

const BackgroundVideo = () => {
  const dispatch = useDispatch();
  const desiredObjectName = 'Videos/losange-derniere.mp4';
  const loading = useSelector(selectLoading);
  const videoUrl = useSelector(state => {
    const desiredObject = state.storage.objectData[desiredObjectName];
    return desiredObject ? desiredObject : null;
  });

  useEffect(() => {
    
    // Fetch objects using the fetchObjects action from the storageSlice
    const fetchObjectsFromStorage = async () => {
      try {
        dispatch(asyncActionStart());
        dispatch(clearStorage());
        await dispatch(fetchObject(desiredObjectName));

        dispatch(asyncActionFinish());
        dispatch(appLoaded());

      } catch (error) {
        console.log(error);
      } 
    };

    fetchObjectsFromStorage();
  }, [dispatch]);



  

  return (
    <Box
      pos="relative"
      width="100%"
      minHeight={['20vh', '40vh', '60vh', '80vh']}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
      >
                {!loading ? (
          <motion.video
            autoPlay
            loop
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            width="100%"
            height="100%"
            objectFit="cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </motion.video>
        ) : (
          <LoadingSpinner />
        )}
      </Box>
      <Center zIndex={1}>
        <Box maxW={['300', '450', '600px']}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '8xl' }}
            color="white"
          >
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.400',
                zIndex: -1,
              }}
            >
              Freelance
            </Text>
            <br />
            <Text as="span" color="white">
              Graphic Designer & Creative
            </Text>
          </Heading>
        </Box>
      </Center>
    </Box>
  );
};

export default BackgroundVideo;
