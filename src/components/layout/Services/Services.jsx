import { Flex } from "@chakra-ui/react";
import React from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <Flex justifyContent="center" flexWrap="wrap">
      <ServiceCard
        title="Graphic Design Solutions"
        description="Providing visually appealing and impactful designs for various purposes, including logos, branding materials, marketing collaterals, and more."
        animationData={
          "https://lottie.host/8650ff42-b8b9-4c0e-9ba6-0ffd7faa58a3/iEvlNUMDjB.json"
        }
      />
      <ServiceCard
        title="Motion Graphics and 3D Animations"
        description="Creating engaging visual content through animated videos, explainer videos, product demos, and visual effects to bring ideas to life."
        animationData={
          "https://lottie.host/26c7b28b-40c7-4fbb-8867-828a4b7058a7/KjAg9U5HQr.json"
        }
      />
      <ServiceCard
        title="Web Design and UI Development"
        description="Designing and developing custom websites using the latest web technologies, creating visually appealing and user-friendly online experiences."
        animationData={"https://lottie.host/34ce3d86-02ea-4aad-8386-65b471725112/bWM6VeFJ4C.json"}
      />
    </Flex>
  );
};

export default Services;
