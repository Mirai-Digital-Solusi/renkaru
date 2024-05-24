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

const testimonials = [
  {
    username: "Ben Parker",
    position: "CEO",
    company: "Foodtesla",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
        rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
        risus at semper`,
  },
  {
    username: "Ben Parker",
    position: "CEO",
    company: "Foodtesla",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
        rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
        risus at semper`,
  },
  {
    username: "Ben Parker",
    position: "CEO",
    company: "Foodtesla",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
        rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
        risus at semper`,
  },
];

export default function Testimonials() {
  const backgroundServices = useColorModeValue("gray.100", "gray.700");

  return (
    <Container maxW="6xl" p={{ base: 5, md: 5 }} mt={{ md: "3em" }}>
      <Center h={{ base: 20, md: 50 }}>
        <Tag
          size="lg"
          variant="solid"
          colorScheme="teal"
          borderRadius="full"
          marginInline="auto"
        >
          Testimonials
        </Tag>
      </Center>

      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
        What People Are Saying About Us
      </chakra.h3>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={4}
      >
        {testimonials.map((testimonial, index) => (
          <VStack
            spacing={3}
            p={{ base: 4, sm: 8 }}
            bg={backgroundServices}
            borderTop="2px solid"
            borderColor="green.400"
            borderBottomLeftRadius="lg"
            borderBottomRightRadius="lg"
            maxW="25rem"
            margin="0 auto"
            boxShadow="lg"
          >
            <Icon as={FaQuoteRight} w={8} h={8} color="green.400" />
            <Text p={5} color="gray.500">
              {testimonial.content}
            </Text>
            <VStack alignItems="center">
              <Avatar name="avatar" src={testimonial.image} size="lg" />
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  {testimonial.username}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {testimonial.position} at {testimonial.company}
                </Text>
              </Box>
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  );
}
