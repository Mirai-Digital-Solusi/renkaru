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
  Heading,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaGithub } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { MdOutlineContentCopy } from "react-icons/md";

export default function ServicesHero({apiData}) {
    
  return (
    <Container
      maxW="100%"
      bgGradient={`linear(to-tl, #2575fc 0%,  #6a11cb 100%)`}
    >
        {apiData.map((featureApi, indexApiData) => (
      <Box pb={8}>
        <Stack
          pl={{ base: 0, md: 20 }}
          pr={{ base: 0, md: 20 }}
          pt={{ base: 10, md: 20 }}
          mb={{ base: 40, md: 40 }}
          direction={{ base: "column", md: "row" }}
          spacing={10}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            maxW="100%"
          >
            <Box>
              <chakra.h1
                fontSize={{ base: "3xl", md: "4xl" }}
                color="#FFFFFF"
                lineHeight={1}
                fontWeight="bold"
                textAlign={{ base: "center", md: "left" }}
              >
                {featureApi.feature_heading_one}
              </chakra.h1>
            </Box>
          </Stack>
          <Stack
            spacing={{ base: 5, sm: 2 }}
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
            maxW={{ base: "100%", md: "40%" }}
          >
            <Text
              fontSize="1.1rem"
              textAlign={{ base: "center", md: "left" }}
              lineHeight="1.375"
              fontWeight="400"
              color="#FFFFFF"
            >
              {featureApi.feature_subheading_one}
            </Text>
          </Stack>
        </Stack>
      </Box>
        ))}
    </Container>
  );
}
