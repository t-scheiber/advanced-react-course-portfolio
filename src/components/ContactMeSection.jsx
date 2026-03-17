import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: (values) => {
      submit(values.firstName);
      formik.resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string(),
      comment: Yup.string().required("Required").min(25, "Must be at least 25 characters"),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text as="label" htmlFor="firstName" display="block" mb={2}>
                  Name
                </Text>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Text mt={2} color="red.300" fontSize="sm">
                    {formik.errors.firstName}
                  </Text>
                ) : null}
              </Box>
              <Box w="100%">
                <Text as="label" htmlFor="email" display="block" mb={2}>
                  Email Address
                </Text>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Text mt={2} color="red.300" fontSize="sm">
                    {formik.errors.email}
                  </Text>
                ) : null}
              </Box>
              <Box w="100%">
                <Text as="label" htmlFor="type" display="block" mb={2}>
                  Type of enquiry
                </Text>
                <Box
                  as="select"
                  id="type"
                  name="type"
                  w="100%"
                  px={4}
                  py={3}
                  borderRadius="md"
                  color="black"
                  backgroundColor="white"
                  {...formik.getFieldProps("type")}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Box>
              </Box>
              <Box w="100%">
                <Text as="label" htmlFor="comment" display="block" mb={2}>
                  Your message
                </Text>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                {formik.touched.comment && formik.errors.comment ? (
                  <Text mt={2} color="red.300" fontSize="sm">
                    {formik.errors.comment}
                  </Text>
                ) : null}
              </Box>
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
