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
  const { isLoading, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: async (values) => {
      const result = await submit(values);
      onOpen(result.type, result.message);
      if (result.type === "success") formik.resetForm();
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
      gap={8}
    >
      <VStack w="min(1024px, 100vw)" p={{ base: 6, md: 32 }} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack gap={4}>
              <Box w="100%">
                <Text asChild display="block" mb={2}><label htmlFor="firstName">Name</label></Text>
                <Input
                  id="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Text mt={2} color="red.300" fontSize="sm">
                    {formik.errors.firstName}
                  </Text>
                ) : null}
              </Box>
              <Box w="100%">
                <Text asChild display="block" mb={2}><label htmlFor="email">Email Address</label></Text>
                <Input
                  id="email"
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
                <Text asChild display="block" mb={2}><label htmlFor="type">Type of enquiry</label></Text>
                <Box
                  as="select"
                  id="type"
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
                <Text asChild display="block" mb={2}><label htmlFor="comment">Your message</label></Text>
                <Textarea
                  id="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                {formik.touched.comment && formik.errors.comment ? (
                  <Text mt={2} color="red.300" fontSize="sm">
                    {formik.errors.comment}
                  </Text>
                ) : null}
              </Box>
              <Button type="submit" colorPalette="purple" width="full" loading={isLoading} loadingText="Submit">
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
