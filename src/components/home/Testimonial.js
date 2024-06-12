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
  Avatar,
  useColorModeValue,
  Icon,
  VStack,
} from "@chakra-ui/react";

import { FaQuoteRight } from "react-icons/fa";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";


export default function Testimonials() {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [dataTestimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials();

  }, []);

  async function getTestimonials() {
    const { data } = await supabase.from("testimonials").select().range(0, 3);
    console.log("data services", data);
    setTestimonials(data);
  }

  const backgroundServices = useColorModeValue("gray.100", "gray.700");

  return (
    <Container maxW="6xl" p={{ base: 5, md: 5 }} mt={{ md: "3em" }} mb={10}>
      <Center h={{ base: 20, md: 50 }}>
      <chakra.h3 bg="#FFFFFF" p={1} pl={5} pr={5} borderRadius={20} mb={5} color="#2F4858" fontWeight="bold" textAlign="center">
        Testimonials
      </chakra.h3>
      </Center>

      <chakra.h3 fontSize="4xl" fontFamily="highlightFont" color="#FFFFFF" fontWeight="bold" textAlign="center">
        What People Are Saying About Us
      </chakra.h3>
      <chakra.h4 fontSize="2xl" color="#FFFFFF" mb={10} textAlign="center">
      Discover Why Our Customers Rave About Our Exceptional Service
      </chakra.h4>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={4}
      >
        {dataTestimonials.map((testimonial, index) => (
          <VStack
            spacing={3}
            p={{ base: 4, sm: 8 }}
            bg={backgroundServices}
            borderTop="5px solid"
            borderColor="green.400"
            borderTopRightRadius="lg"
            borderTopLeftRadius="lg"
            borderBottomLeftRadius="lg"
            borderBottomRightRadius="lg"
            maxW="25rem"
            margin="0 auto"
            boxShadow="lg"
          >
            <Icon as={FaQuoteRight} w={8} h={8} color="#00A585" />
            <Text p={5} color="gray.500" textAlign="center">
              {testimonial.testimonial_review}
            </Text>
            <VStack alignItems="center">
              <Avatar name="avatar" src={"https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +testimonial.image_url} size="lg" />
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  {testimonial.testimonial_name}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {testimonial.testimonial_background}
                </Text>
              </Box>
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  );
}
