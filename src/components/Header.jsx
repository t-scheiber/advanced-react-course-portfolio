import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope, label: "Email",
    url: "mailto:hello@thomasscheiber.com",
  },
  {
    icon: faGithub, label: "GitHub",
    url: "https://github.com/",
  },
  {
    icon: faLinkedin, label: "LinkedIn",
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium, label: "Medium",
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow, label: "Stack Overflow",
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  /** @param {string} anchor */
  const handleClick = (anchor) => (/** @type {import("react").MouseEvent<HTMLAnchorElement>} */ event) => {
    event.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY="0"
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={{ base: 4, md: 16 }}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 3, md: 0 }}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack gap={{ base: 4, md: 6 }}>
            {socials.map((social) => (
              <a key={social.label} href={social.url} aria-label={social.label}>
                <FontAwesomeIcon icon={social.icon} size="2x"/> 
              </a>
            ))}
            </HStack>
          </nav>
          <nav>
            <HStack gap={8}>
              <a href="#projects-section" onClick={handleClick("projects")}>Projects</a>
              <a href="#contactme-section" onClick={handleClick("contactme")}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;