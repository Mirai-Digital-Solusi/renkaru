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



export default function ServicesHome(props) {
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
      <chakra.h3 bg="#FFFFFF" p={1} pl={5} pr={5} borderRadius={20} mb={5} color="#2F4858" fontSize="xl" fontWeight="bold" textAlign="center">
        Our Services
      </chakra.h3>
      </Center>

      <chakra.h3 color="white" fontSize="4xl" fontWeight={700} mb={10} textAlign="center">
        We Have&nbsp;
        <Text as={'u'} color={'#2F4858'} fontFamily="highlightFont" fontWeight={500} fontStyle="italic">Everything</Text>&nbsp;&nbsp;You Need!
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
