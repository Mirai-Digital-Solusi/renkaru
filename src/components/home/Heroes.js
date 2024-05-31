/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  chakra,
  Stack,
  HStack,
  Text,
  Link,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Skeleton,
  Image,
  Container,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultMain from "layouts/main/Default";
// Assets
import illustration from "assets/img/auth/auth.jpg";
import { FcGoogle } from "react-icons/fc";
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import Service from "components/home/Service";
import { RiEyeCloseLine } from "react-icons/ri";

import AuthService from "services/auth.services.js";

export default function Heroes() {
  const { children, illustrationBackground } = illustration;

  function DottedBox() {
    return (
      <Box
        position="absolute"
        left="-45px"
        top="-30px"
        height="full"
        maxW="700px"
        zIndex={-1}
      >
        <svg
          color={useColorModeValue(
            "rgba(55,65,81, 0.1)",
            "rgba(55,65,81, 0.7)"
          )}
          width="350"
          height="420"
          fill="none"
        >
          <defs>
            <pattern
              id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
          ></rect>
        </svg>
      </Box>
    );
  }
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  function validateLogin(email) {
    let error;
    if (!email) {
      error = "email or password is required";
    }
    return error;
  }

  return (
    <Flex
      h={{
        sm: "initial",
        md: "unset",
        lg: "100vh",
        xl: "97vh",
      }}
      w="100%"
      maxW={{ md: "66%", lg: "1313px" }}
      mx="auto"
      pt={{ sm: "50px", md: "0px" }}
      px={{ lg: "30px", xl: "0px" }}
      ps={{ xl: "70px" }}
      justifyContent="start"
      direction="column"
    >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            maxW="480px"
          >
            <HStack
              as={Link}
              p={1}
              rounded="full"
              fontSize="sm"
              w="max-content"
              bg={useColorModeValue("gray.300", "gray.700")}
            >
              <Box
                py={1}
                px={2}
                lineHeight={1}
                rounded="full"
                color="white"
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              >
                Exclusive Offers
              </Box>
              <HStack spacing={1} alignItems="center" justifyContent="center">
                <Text lineHeight={1}>See our recent offers</Text>
                <Icon as={GoChevronRight} w={4} h={4} />
              </HStack>
            </HStack>
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              Find Your Perfect <br />
              <chakra.span color="teal">Rental Car</chakra.span>
            </chakra.h1>
            <Text
              fontSize="1.2rem"
              textAlign="left"
              lineHeight="1.375"
              fontWeight="400"
              color="gray.500"
            >
              Discover and book the ideal rental car for your next journey with
              ease. Our service offers a wide selection of vehicles to suit
              every need and budget.
            </Text>
            <HStack
              spacing={{ base: 0, sm: 2 }}
              mb={{ base: "3rem !important", sm: 0 }}
              flexWrap="wrap"
            >
              <chakra.button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="white"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                lineHeight={1}
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{
                  bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                  opacity: 0.9,
                }}
              >
                <chakra.span>Check Availability</chakra.span>
                <Icon as={MdBolt} h={4} w={4} ml={1} />
              </chakra.button>
              <Box
                d="flex"
                justifyContent="center"
                bg={useColorModeValue("white", "gray.800")}
                w={{ base: "100%", sm: "auto" }}
                border="1px solid"
                borderColor="gray.300"
                p={3}
                lineHeight={1.18}
                rounded="md"
                boxShadow="md"
                as={Link}
                href="#/main/fleets"
                zIndex={55555555}
              >
                Our Fleet
              </Box>
            </HStack>
          </Stack>
          {/* <Box>
            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Reservation
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Find Your Perfect Rental Car!
              </Text>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: "100%", md: "420px" }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: "auto", lg: "unset" }}
              me="auto"
              mb={{ base: "20px", md: "auto" }}
            >
              <Formik
                initialValues={{
                  email: "mds@miraisolusi.com",
                  password: "renkaru",
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    console.log(values.email);
                    AuthService.login(values.email, values.password).then(
                      () => {
                        history.push("/admin/profile");
                      },
                      (error) => {
                        const resMessage =
                          (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                          error.message ||
                          error.toString();
                      }
                    );
                    actions.setSubmitting(false);
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="dateTo" validate={validateLogin}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel
                            htmlFor="text"
                            display="flex"
                            ms="4px"
                            fontSize="sm"
                            fontWeight="500"
                            color={textColor}
                            mb="8px"
                          >
                            Rental Type<Text color={brandStars}>*</Text>
                          </FormLabel>
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                          <Input
                            {...field}
                            variant="auth"
                            fontSize="sm"
                            ms={{ base: "0px", md: "0px" }}
                            mb="24px"
                            fontWeight="500"
                            size="lg"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <SimpleGrid columns={2} spacing={5}>
                      <Field name="dateFrom" validate={validateLogin}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel
                              htmlFor="text"
                              display="flex"
                              ms="4px"
                              fontSize="sm"
                              fontWeight="500"
                              color={textColor}
                              mb="8px"
                            >
                              Date From<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                            <Input
                              {...field}
                              variant="auth"
                              fontSize="sm"
                              ms={{ base: "0px", md: "0px" }}
                              mb="24px"
                              fontWeight="500"
                              size="lg"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="dateTo" validate={validateLogin}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel
                              htmlFor="text"
                              display="flex"
                              ms="4px"
                              fontSize="sm"
                              fontWeight="500"
                              color={textColor}
                              mb="8px"
                            >
                              Date To<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                            <Input
                              {...field}
                              variant="auth"
                              fontSize="sm"
                              ms={{ base: "0px", md: "0px" }}
                              mb="24px"
                              fontWeight="500"
                              size="lg"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>
                    <Button
                      fontSize="sm"
                      variant="brand"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="24px"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Search!
                    </Button>
                  </Form>
                )}
              </Formik>
            </Flex>
          </Box> */}
        </Stack>
      </Flex>
      <Box
        display={{ base: "none", md: "block" }}
        h="100%"
        minH="100vh"
        w={{ lg: "50vw", "2xl": "44vw" }}
        position="absolute"
        right="0px"
      >
        <Flex
          bg={`url(${illustration})`}
          justify="center"
          align="end"
          w="100%"
          h="100%"
          bgSize="cover"
          bgPosition="50%"
          position="absolute"
          borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
        ></Flex>
      </Box>
    </Flex>
  );
}
