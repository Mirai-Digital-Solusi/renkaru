import { SVGProps } from "react";
import {
  Container,
  Box,
  chakra,
  Center,
  Text,
  SimpleGrid,
  Flex,
  Link,
  Tag,
  Image,
  Wrap,
  WrapItem,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const features = [
  {
    heading: "Private Rental",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: (
      <svg
        width={36}
        height={36}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        ></path>
      </svg>
    ),
  },
  {
    heading: "Business Rental",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: (
      <svg
        width={36}
        height={36}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        ></path>
      </svg>
    ),
  },
  {
    heading: "Trucking",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: (
      <svg
        width={36}
        height={36}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
    ),
  },
];

export default function Features(props) {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [dataServices, setServices] = useState([]);

  useEffect(() => {
    getServices();
    console.log("data services", dataServices);
  }, []);

  async function getServices() {
    const { data } = await supabase.from("services").select();
    console.log("data services", data);
    setServices(data);
  }

  const backgroundServices = useColorModeValue("gray.100", "gray.700");

  return (
    <Container maxW="6xl" p={{ base: 5, md: 5 }} mt={{ md: "3em" }}>
      <Center h={{ base: 20, md: 50 }}>
      <chakra.h3 bg="#FFFFFF" p={1} pl={3} pr={3} borderRadius={20} mb={5} color="#2F4858" fontSize="xl" fontWeight="bold" textAlign="center">
        Our Services
      </chakra.h3>
      </Center>

      <chakra.h3 color="white" fontSize="4xl" fontWeight={700} mb={10} textAlign="center">
        We Have&nbsp;
        <Text as={'u'} color={'#2F4858'}>Everything</Text>&nbsp;You Need!
      </chakra.h3>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={20}
      >
        {dataServices.map((feature, indexServices) => (
          <Box
            key={indexServices}
            bg={backgroundServices}
            p={6}
            rounded="lg"
            textAlign="center"
            pos="relative"
          >
            <Flex
              w="max-content"
              color="white"
              rounded="md"
              marginInline="auto"
              left={0}
              right={0}
              top="-1.5rem"
              boxShadow="xl"
            >
              <Image
                boxSize="100px"
                objectFit="cover"
                src={
                  "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
                  feature.image_url
                }
                alt="Dan Abramov"
              />
            </Flex>
            <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
              {feature.name}
            </chakra.h3>
            <Text fontSize="md" mt={4}>
              {feature.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
