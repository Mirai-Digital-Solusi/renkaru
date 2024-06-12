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
  Heading,
  Avatar,
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
      const { data } = await supabase.from("fleets").select().range(0, 3);
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

      <SimpleGrid columns={3} spacing={5} mt={{ base: 10, md: 10 }}>
      {dataFleets.map((fleets, index) => (
        <Box
        maxW={'445px'}
        w={'full'}
        bg="#FFFFFF"
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Flex ml="0 !important">
                <Image
                  rounded="md"
                  w={{ base: "100%", md: "100%" }}
                  h="12rem"
                  objectFit="cover"
                  src={
                    "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
                    fleets.image_url
                  }
                  alt="fleets image"
                />
              </Flex>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'xl'}
            mt={5}
            letterSpacing={1.1}>
            {fleets.fleet_year}
          </Text>
          <Heading
            color="#464555"
            fontSize={'2xl'}
            fontFamily={'body'}>
            {fleets.fleet_name}
          </Heading>
          <Text noOfLines={4} color={'gray.500'}>
          {fleets.fleet_desc}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontSize={'xl'} fontWeight={600}>{fleets.fleet_price_day}</Text>
            <Text fontSize={'md'} color={'gray.500'}>Capacity : {fleets.fleet_capacity} &nbsp;&nbsp; |  &nbsp;&nbsp;Luggage : {fleets.fleet_luggage}</Text>
          </Stack>
        </Stack>
      </Box>

))}
      </SimpleGrid>

      <Center h={{ base: 20, md: 50 }} mb={{base: 10, md: 20}}>
        <Link href="#/main/fleets" mt={20} fontSize="sm" color="blue.400">
          <Tag
            size={"lg"}
            variant="solid"
            bgGradient="linear(to-r, teal.400, green.500)"
            p={3} 
          >
            <TagLabel>View More</TagLabel>
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
