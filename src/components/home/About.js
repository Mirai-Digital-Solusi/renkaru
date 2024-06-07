import { PropsWithChildren } from "react";
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

export default function AboutUs() {
  const Content = ({ children, ...props }) => {
    return (
      <Text
        fontSize="md"
        textAlign="left"
        lineHeight="1.375"
        fontWeight="400"
        color="gray.500"
        {...props}
      >
        {children}
      </Text>
    );
  };

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
            src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80`}
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
            Your Trusted Partner for Seamless Car Rental Experiences
          </chakra.h1>
        </Stack>
      </Stack>
      <Box as="h2" fontSize="2xl" fontWeight="600" mt={10} textAlign="justify">
        Your Trusted Partner
      </Box>
      <Box as="h3" fontSize="2xl" fontWeight="200" mt={5} textAlign="justify">
        It conveys a sense of reliability, partnership, and a company you can
        count on. Trust is essential when choosing a car rental service.
      </Box>
      <Box as="h2" fontSize="2xl" fontWeight="600" mt={10} textAlign="justify">
        Seamless Car Rental Experiences
      </Box>
      <Box as="h3" fontSize="2xl" fontWeight="200" mt={5} textAlign="justify">
        It implies that the company aims to provide hassle-free, smooth, and
        efficient car rental experiences for their customers. It's a concise
        title that can pique interest and invites the reader to learn more about
        the company's value proposition in the following "About Us" section.
      </Box>
    </Container>
  );
}
