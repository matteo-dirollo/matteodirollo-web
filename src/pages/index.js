import React from "react";
import { fetchUsers, resetState } from "@/api/auth/authSlice";
import BackgroundVideo from "@/components/layout/BackgroundVideo/BackgroundVideo";
import Services from "@/components/layout/Services/Services";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <Box>
      <VStack justifyContent="center" alignItems="center">
        <BackgroundVideo />
        <Services />
        {/* <LatestPosts /> */}
      </VStack>
    </Box>
  );
};

export default Home;
