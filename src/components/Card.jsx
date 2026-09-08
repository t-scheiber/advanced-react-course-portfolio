import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

/** @param {{title: string, description: string, imageSrc: string}} props */
const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <div>
      <HStack gap={3}>
        <Box
          backgroundColor="white"
          color="black"
          rounded="3xl"
          paddingBottom={5}
        >
          <VStack gap={3}>
            <Image src={imageSrc} alt={title} rounded="3xl" />
            <Box paddingX={4}>
              <Heading paddingY={3} size="md">
                {title}
              </Heading>
              <Text>{description}</Text>
              <HStack gap={2}>
                <Text fontWeight="bold">See More</Text>
                <FontAwesomeIcon icon={faArrowRight} />
              </HStack>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </div>
  );
};

export default Card;