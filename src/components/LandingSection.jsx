import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Thomas!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={8}>
    <VStack spacing={3}>

<Avatar name="Thomas Scheiber" src="https://www.gravatar.com/avatar/435cf21933936cc88a53dfa5e5a37ac7f9ad92dab7a5f9bccd3a3771fcd1cc65" size="2xl"/>
<Heading size="md">{greeting}</Heading>
    </VStack>
<Heading size="2xl">{bio1}</Heading>
<Heading size="2xl">{bio2}</Heading>


    </VStack>
  </FullScreenSection>
);

export default LandingSection;