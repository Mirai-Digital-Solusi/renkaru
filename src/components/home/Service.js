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
  Stack,
  Button,
  Icon,
  StackDivider,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
  IoCheckmarkSharp,
} from "react-icons/io5";
import { FcAssistant, FcIdea, FcInspection } from "react-icons/fc";

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

  const Feature = ({ title, text, icon }) => {
    return (
      <Stack>
        {icon}
        <Text fontWeight={600}>{title}</Text>
        <Text color={"gray.600"}>{text}</Text>
      </Stack>
    );
  };

  const FeatureServices = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={"row"} align={"center"}>
        <Flex
          w={8}
          h={8}
          align={"center"}
          justify={"center"}
          rounded={"full"}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  return (
    <Container maxW="100%" mb={{ base: 0, md: 10 }}>
      <Box
        maxW="5xl"
        p={4}
        isolation="isolate"
        zIndex={3}
        mt="-9rem"
        marginInline="auto"
      >
        <Box
          boxShadow={useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          bg={useColorModeValue("white", "gray.800")}
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
        >
          <Stack
            pos="relative"
            zIndex={1}
            direction="column"
            spacing={5}
            textAlign="center"
          >
            <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              Why Choose Us?
            </chakra.h1>
            <chakra.h1
              color="rgba(0, 0, 0, 0.65)"
              fontSize="xl"
              maxW="100%"
              lineHeight={1.2}
            >
              At Renkaru, we understand that renting a car is more than just a
              transaction – it's an integral part of your journey. That's why
              we've dedicated ourselves to providing an exceptional rental
              experience that exceeds your expectations at every turn.
            </chakra.h1>
            <Center
              h={{ base: 20, md: 50 }}
              mt={{ base: 80, md: 20 }}
              mb={{ base: 80, md: 20 }}
            >
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Feature
                  icon={<Icon as={FcAssistant} w={10} h={10} marginX="auto" />}
                  title={"All Day Support"}
                  text={
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                  }
                />
                <Feature
                  icon={<Icon as={FcInspection} w={10} h={10} marginX="auto" />}
                  title={"Quality and Reliability"}
                  text={
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                  }
                />
                <Feature
                  icon={<Icon as={FcIdea} w={10} h={10} marginX="auto" />}
                  title={"Trusted and Experienced"}
                  text={
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                  }
                />
              </SimpleGrid>
            </Center>
          </Stack>
        </Box>
      </Box>
      <chakra.h3
        mt={{ base: 10, md: 20 }}
        pl={{ base: 0, md: 80 }}
        pr={{ base: 0, md: 80 }}
        color="purple.700"
        fontSize="large"
        fontWeight="bold"
        textAlign="center"
      >
        EXPLORE OUR RENTAL SERVICES
      </chakra.h3>
      <chakra.h4 fontSize="4xl" fontWeight="bold" mb={12} textAlign="center">
        Discover Our Service to Craft <br /> Your Unforgettable Journey
      </chakra.h4>
      {dataServices.map((feature, indexServices) => (
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          borderRadius="md"
        >
          <Box
            p={10}
            pl={{ base: 0, md: 20 }}
            pr={{ base: 0, md: 20 }}
            mr={{ base: 0, md: 0 }}
            pos="relative"
          >
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              maxH="20rem"
              objectFit="cover"
              src={
                "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
                feature.image_url
              }
              rounded="xl"
            />
          </Box>
          <Stack
            direction="column"
            p={10}
            pr={{ base: 0, md: 20 }}
            spacing={6}
            justifyContent="center"
          >
            <chakra.h1
              fontSize="3xl"
              mt={{ base: 5, md: 0 }}
              mb={{ base: 5, md: 0 }}
              lineHeight={1}
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
            >
              {feature.name}
            </chakra.h1>
            <Box as="h2" fontSize="xl" fontWeight="400" textAlign="justify">
              {feature.description}
            </Box>
            <Stack
              spacing={4}
              divider={<StackDivider borderColor={"gray.500"} />}
            >
              <FeatureServices
                icon={
                  <Icon as={IoCheckmarkSharp} color={"#FFFFFF"} w={5} h={5} />
                }
                iconBg={"green.500"}
                text={"Quality and Reliability"}
              />
              <FeatureServices
                icon={
                  <Icon as={IoCheckmarkSharp} color={"#FFFFFF"} w={5} h={5} />
                }
                iconBg={"green.500"}
                text={"Unmatched Convenience"}
              />
              <FeatureServices
                icon={
                  <Icon as={IoCheckmarkSharp} color={"#FFFFFF"} w={5} h={5} />
                }
                iconBg={"green.500"}
                text={"Trusted and Experienced"}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Container>
  );
}
