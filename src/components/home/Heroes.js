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

import React, { useMemo, useEffect, useState } from "react";
import { NavLink, useHistory, Link as ReactRouterLink } from "react-router-dom";

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultMain from "layouts/main/Default";
// Assets
import illustration from "assets/img/auth/heroesOne.jpg";
import illustrationTwo from "assets/img/auth/heroesTwo.jpg";
import { FcGoogle } from "react-icons/fc";
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import Service from "components/home/Service";
import { RiEyeCloseLine } from "react-icons/ri";

import { createClient } from "@supabase/supabase-js";
import AuthService from "services/auth.services.js";
import UtilService from "services/util.service.js";

export default function Heroes() {
  const { children, illustrationBackground } = illustration;

  let DateFrom = UtilService.dateFrom;
  let DateTo = UtilService.dateTo;

  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [data, setRentalOrders] = useState([]);
  const [urlExcel, setUrlExcel] = useState("");

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const [inputClientDateRentFrom, setClientDateRentFrom] = useState(DateFrom);
  const [inputClientDateRentTo, setClientDateRentTo] = useState(DateTo);
  const [inputClientCapacity, setClientCapacity] = useState(0);
  const [inputClientRentType, setClientRentType] = useState();

  const searchAvailability = async (dataSearch) => {
    var dtf = inputClientDateRentFrom.replace("T", " ");
    var dtt = inputClientDateRentTo.replace("T", " ");

    console.log("data from", dtf);
    try {
      const { data, error } = await supabase
        .from("rentalOrders")
        .select()
        .in("client_rent_status", ["Booked", "On Review Payment", "Ongoing"])
        .gte("client_date_rent_from", dtf)
        .lte("client_date_rent_to", dtt);

      const { data: dataFleets, error: checkError } = await supabase
        .from("fleets")
        .select("*")
        .eq("fleet_capacity", inputClientCapacity);

      dataFleets.map(function (fleets) {
        let fleetId = data.filter(
          (o) => o.client_rented_car === fleets.fleet_name
        ).length;
        if (fleets.fleet_total_number - fleetId === 0) {
          console.log(fleets.fleet_name + " tidak tersedia");
          let dataForRemove = dataFleets.findIndex(
            (obj) => obj.id === fleets.id
          );
          dataFleets.splice(dataForRemove, 1);
        } else {
          console.log("data flee id", fleets.fleet_total_number - fleetId);
          let availableFleet =
            fleets.fleet_total_number - (isNaN(fleetId) ? 0 : fleetId);
          console.log(
            fleets.fleet_name + " tersedia sejumlah " + availableFleet
          );
        }
      });

      console.log("SETELAH FILTER", dataFleets);
      if (checkError) {
        throw checkError;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const rentType = [
    {
      option: "Private Rentals",
    },
    {
      option: "Corporate Rentals",
    },
  ];

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

  const routeChange = () => {
    let path = `/main/fleets`;
    let data = {
      inputClientDateRentFrom: inputClientDateRentFrom,
      inputClientDateRentTo: inputClientDateRentTo,
      inputClientCapacity: inputClientCapacity,
    };
    console.log("data yang dipass", data);
    history.push(path, { state: { data } });
  };

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
      {/* Modal For Create Fleets */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="blur(7px) hue-rotate(350deg)"
        />

        <ModalContent>
          <ModalHeader>Check Availability</ModalHeader>
          <ModalBody>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Date Rent From
                </Text>
                <Input
                  w={"100%"}
                  focusBorderColor="black"
                  placeholder="Input Date Rent From"
                  borderRadius="10px"
                  mb={3}
                  mr={10}
                  type="datetime-local"
                  value={inputClientDateRentFrom}
                  onChange={(e) => {
                    setClientDateRentFrom(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Date Rent To
                </Text>
                <Input
                  w={"100%"}
                  focusBorderColor="black"
                  placeholder="Input Date Rent To"
                  borderRadius="10px"
                  mb={3}
                  mr={4}
                  type="datetime-local"
                  value={inputClientDateRentTo}
                  onChange={(e) => {
                    setClientDateRentTo(e.target.value);
                  }}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Capacity
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Passenger Capacity"
                  borderRadius="10px"
                  mb={3}
                  mr={5}
                  value={inputClientCapacity}
                  onChange={(e) => setClientCapacity(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rent Type
                </Text>
                <Select
                  mr={"4em"}
                  w={"100%"}
                  borderRadius="10px"
                  mb={3}
                  placeholder="Select Rent Type"
                  value={inputClientRentType}
                  onChange={(e) => setClientRentType(e.target.value)}
                >
                  {rentType.map((rentTypes, index) => (
                    <option value={rentTypes.option}>{rentTypes.option}</option>
                  ))}
                </Select>
              </Box>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onCloseCreate}>
              Cancel
            </Button>
            <Link
              as={ReactRouterLink}
              to={{
                pathname: "/main/fleets",
                state: {
                  inputClientDateRentFrom: inputClientDateRentFrom,
                  inputClientDateRentTo: inputClientDateRentTo,
                  inputClientCapacity: inputClientCapacity,
                },
              }}
            >
              <Button colorScheme="facebook">Search</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              href="#/main/offers"
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
              color="gray.700"
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
                onClick={() => {
                  onOpenCreate();
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
        </Stack>
      </Flex>
      <Box
        display={{ base: "none", md: "block" }}
        h="60%"
        minH="60vh"
        w={{ lg: "50vw", "2xl": "44vw" }}
        position="absolute"
        right="0px"
        top="5em"
      >
        <Flex
          bg={`url(${illustration})`}
          justify="center"
          align="end"
          w="80%"
          h="100%"
          left="4em"
          bgSize="cover"
          bgPosition="100%"
          position="absolute"
          borderTopRightRadius={{ lg: "100px", xl: "100px" }}
          borderBottomRightRadius={{ lg: "20px", xl: "20px" }}
          borderTopLeftRadius={{ lg: "20px", xl: "20px" }}
        ></Flex>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        h="60%"
        minH="60vh"
        w={{ lg: "50vw", "2xl": "44vw" }}
        position="absolute"
        right="0"
        top="20em"
      >
        <Flex
          bg={`url(${illustrationTwo})`}
          justify="center"
          align="end"
          w="50%"
          h="50%"
          bgSize="cover"
          bgPosition="50%"
          position="absolute"
          borderBottomLeftRadius={{ lg: "40px", xl: "50px" }}
          borderTopRightRadius={{ lg: "100px", xl: "100px" }}
          borderBottomRightRadius={{ lg: "20px", xl: "20px" }}
          borderTopLeftRadius={{ lg: "20px", xl: "20px" }}
        ></Flex>
      </Box>
    </Flex>
  );
}
