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
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaGithub } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
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

  return (
    <Container maxW="100%">
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
              color="gray.400"
              fontSize="xl"
              maxW="100%"
              lineHeight={1.2}
            >
              At Renkaru, we understand that renting a car is more than just a
              transaction – it's an integral part of your journey. That's why
              we've dedicated ourselves to providing an exceptional rental
              experience that exceeds your expectations at every turn.
            </chakra.h1>
            <Center h={{ base: 20, md: 50 }} mt={{ base: 80, md: 20 }} mb={{ base: 80, md: 20 }}>
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
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={20}
        mt={20}
      >
        {dataServices.map((feature, indexServices) => (
          <Box
            key={indexServices}
            bg={backgroundServices}
            p={6}
            rounded="xl"
            textAlign="center"
            pos="relative"
          >
            <Flex
              w="max-content"
              color="white"
              rounded="xl"
              marginInline="auto"
              left={0}
              right={0}
              top="-1.5rem"
              boxShadow="xl"
              borderRadius={20}
            >
              <Image
                boxSize="100px"
                objectFit="cover"
                borderRadius={20}
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
