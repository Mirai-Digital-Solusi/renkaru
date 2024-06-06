import { PropsWithChildren, Fragment } from "react";
import {
  chakra,
  Box,
  Stack,
  VStack,
  HStack,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  StackProps,
  Center,
  Tag,
  TagLabel,
  TagRightIcon,
  Link,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BsArrowUpRightCircle } from "react-icons/bs";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import HeaderFleet from "components/headerHome/Fleets/headerFleet";
import UtilService from "services/util.service.js";

export default function Fleet() {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  let DateFrom = UtilService.dateFrom;
  let DateTo = UtilService.dateTo;

  const [dataFleets, setFleets] = useState([]);
  const [inputClientDateRentFrom, setClientDateRentFrom] = useState(DateFrom);
  const [inputClientDateRentTo, setClientDateRentTo] = useState(DateTo);
  const [inputClientCapacity, setClientCapacity] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.state !== void 0) {
      setClientDateRentFrom(location.state.inputClientDateRentFrom);
      setClientDateRentTo(location.state.inputClientDateRentTo);
      setClientCapacity(location.state?.inputClientCapacity);
    }
    getFleets();
  }, []);

  useEffect(() => {
    getFleets();
  }, [inputClientCapacity]);

  async function getFleets() {
    var dtf = inputClientDateRentFrom.replace("T", " ");
    var dtt = inputClientDateRentTo.replace("T", " ");
    console.log("data services setelah home", inputClientCapacity);
    if (inputClientCapacity == 0) {
      const { data } = await supabase.from("fleets").select().range(0, 4);
      console.log("data services setelah home", data);
      setFleets(data);
    } else {
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
      setFleets(dataFleets);
      if (checkError) {
        throw checkError;
      }
    }
  }

  return (
    <Container maxW="6xl" p={{ base: 5, md: 12 }} margin="0 auto">
      <Center h={{ base: 20, md: 50 }}>
        <Tag
          size="lg"
          variant="solid"
          colorScheme="teal"
          borderRadius="full"
          marginInline="auto"
        >
          Our Fleet
        </Tag>
      </Center>

      <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
        Explore Our Car Lineup
      </chakra.h3>

      <Stack  mt={{ base: 10, md: 20 }} direction={{ base: "column", md: "column", lg: "row" }}>
        <HeaderFleet
          inputClientDateRentFrom={inputClientDateRentFrom}
          inputClientDateRentTo={inputClientDateRentTo}
          inputClientCapacity={inputClientCapacity}
          setClientDateRentFrom={setClientDateRentFrom}
          setClientDateRentTo={setClientDateRentTo}
          setClientCapacity={setClientCapacity}
          getFleets={getFleets}
        />
        <Flex align='justify'>
        <VStack
        spacing={10}
        mb={{ base: 5, md: 0 }}
      >
          {dataFleets.map((fleets, index) => (
            <Stack
              key={index}
              spacing={{ base: 0, md: 4 }}
              direction={{ base: "column", md: "row" }}
              border="0.5px solid"
              borderColor="gray.400"
              p={4}
              rounded="md"
              h={{ base: "auto", md: "10em" }}
              w={{ base: "auto", md: "auto" }}
              overflow="hidden"
              pos="relative"
              
            >
              {/* {fleets.isFeatured && (
              <Flex
                alignItems="center"
                p={1}
                bg="red.400"
                pos="absolute"
                fontSize="xs"
                fontWeight="500"
                color="white"
                top={0}
                left={0}
              >
                <Text>FEATURED</Text> &nbsp;{" "}
                <Icon as={AiOutlineExclamationCircle} h={4} w={4} />
              </Flex>
            )} */}
              <Flex ml="0 !important">
                <Image
                  rounded="md"
                  w={{ base: "100%", md: "18rem" }}
                  h="100%"
                  objectFit="cover"
                  src={
                    "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
                    fleets.image_url
                  }
                  alt="fleets image"
                />
              </Flex>
              <Stack
                direction="column"
                spacing={2}
                w="100%"
                mt={{ base: "5px !important", sm: 0 }}
              >
                <Flex justifyContent="space-between">
                  <chakra.h3
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                  >
                    {fleets.fleet_name}
                  </chakra.h3>
                  <chakra.h3
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                  >
                    {"IDR " + fleets.fleet_price_day}
                  </chakra.h3>
                </Flex>
                {/* <Box>
                <Text fontSize="lg" fontWeight="500">
                  {fleets.location}
                </Text>
              </Box> */}
                <Flex noOfLines={3} alignItems="center" color="gray.500">
                  {/* {fleets.detail.map((data, index) => (
                  <Fragment key={index}>
                    <Text fontSize={{ base: "sm", sm: "md" }}>{data}</Text>
                    {fleets.detail.length - 1 != index && (
                      <chakra.span mx={2} fontSize={{ base: "sm", sm: "md" }}>
                        |
                      </chakra.span>
                    )}
                  </Fragment>
                ))} */}
                  {fleets.fleet_desc}
                </Flex>
                <Stack
                  direction={{ base: "column-reverse", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ base: "flex-start", sm: "center" }}
                >
                  <Text fontSize="md" mt={{ base: 1, sm: 0 }}>
                    Capacity : {fleets.fleet_capacity}
                  </Text>
                  <Text fontSize="md" mt={{ base: 1, sm: 0 }}>
                    Luggage : {fleets.fleet_luggage}
                  </Text>
                  <Text fontSize="md" mt={{ base: 1, sm: 0 }}>
                    Year : {fleets.fleet_year}
                  </Text>
                  {/* <Stack direction="row" spacing={1} mb="0 !important">
                  <IconButton>
                    <Icon as={AiOutlineHeart} w={4} h={4} />
                  </IconButton>
                  <IconButton spacing={2} bg="green.500" color="white">
                    <Icon as={BsTelephoneX} w={4} h={4} />
                    <Text fontSize="sm">Show Phone no.</Text>
                  </IconButton>
                </Stack> */}
                </Stack>
              </Stack>
            </Stack>
          ))}
          </VStack>
        </Flex>
      </Stack>

      <Center h={{ base: 20, md: 50 }}>
        <Link href="#/main/fleets" mt={20} fontSize="sm" color="blue.400">
          <Tag
            size={"lg"}
            variant="solid"
            bgGradient="linear(to-r, teal.400, green.500)"
          >
            <TagLabel>See Details</TagLabel>
            <TagRightIcon as={BsArrowUpRightCircle} />
          </Tag>
        </Link>
      </Center>
    </Container>
  );
}

const IconButton = ({ children, ...props }) => {
  return (
    <HStack
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      px={2}
      py="0.15rem"
      alignItems="center"
      rounded="sm"
      spacing={2}
      {...props}
    >
      {children}
    </HStack>
  );
};
