import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
  TextProps,
  Center,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import parse from "html-react-parser";

export default function AboutUs() {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [dataAbout, setAbout] = useState([]);

  useEffect(() => {
    getAbout();
  }, []);

  async function getAbout() {
    const { data } = await supabase.from("aboutUs").select();
    setAbout(data);
  }

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

  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={14}>
      {dataAbout.map((about, index) => (
        <>
      <Center h={{ base: 20, md: 50 }}>
        <Tag
          size="lg"
          variant="solid"
          colorScheme="teal"
          borderRadius="full"
          marginInline="auto"
        >
          Our Story
        </Tag>
      </Center>

      <chakra.h3 fontSize="4xl" mb={10} fontWeight="bold" textAlign="center">
        About Us
      </chakra.h3>
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        bg="gray.200"
        borderRadius="md"
      >
        <Box mr={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          <Image
            boxShadow="lg"
            w="100%"
            h="100%"
            minW={{ base: "auto", md: "30rem" }}
            maxH="20rem"
            objectFit="cover"
            src={
              "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
              about.image_url
            }
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
        <Stack direction="column" spacing={6} justifyContent="center">
          <chakra.h1
            fontSize="5xl"
            mt={{ base: 5, md: 0 }}
            mb={{ base: 5, md: 0 }}
            lineHeight={1}
            fontWeight="bold"
            textAlign={{ base: "center", md: "left" }}
          >
            {about.about_title}
          </chakra.h1>
        </Stack>
      </Stack>
      <Box as="h2" fontSize="2xl" fontWeight="400" mt={10} textAlign="justify">
      {parse(about.about_desc)}
      </Box>
      </>
      ))}
    </Container>
  );
}
