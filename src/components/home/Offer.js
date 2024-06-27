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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Stack,
  Heading,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Offers(props) {
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
         <chakra.h3 bg="#464555" fontSize="xl" p={2} pl={5} pr={5} borderRadius={20} mb={5} color="#F5F5F5" fontWeight="bold" textAlign="center">
        Recent Offer!
      </chakra.h3>
      </Center>

      <chakra.h3
        fontSize="4xl"
        color={'#6A3D00'}
        fontWeight={900}
        mb={10}
        textAlign="center"
        letterSpacing={".5px"}
      >
        Explore Our Best Prices of the Season!
      </chakra.h3>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={20}
      >
        {dataServices.map((feature, indexServices) => (
          <Card maxW="sm" borderRadius={20}>
            <Image
              src={
                "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
                feature.image_url
              }
              w={{ base: "100%", md: "100%" }}
              h="12rem"
              objectFit="cover"
              alt="Offers Image"
              borderTopLeftRadius={20}
              borderTopRightRadius={20}
            />
            <CardBody>
              <Tag size="md" variant="solid" colorScheme="teal">
                Special Offer
              </Tag>
              <Stack mt="2" spacing="3">
                <Heading size="md" letterSpacing={".4px"}>
                  {feature.name}
                </Heading>
                <Text noOfLines={4} letterSpacing={".1px"} fontWeight={100}>
                  {feature.description}
                </Text>
                <Button mt={2} variant="solid" colorScheme="blue">
                  Details
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
