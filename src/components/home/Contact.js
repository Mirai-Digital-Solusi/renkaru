import { Fragment } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  chakra,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Box,
  HStack,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
  Center,
  Tag,
  Image,
  Checkbox,
  Link,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { GoLocation } from 'react-icons/go';
import { BsPhone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

const contactOptions = [
  {
    id: 1,
    label:  'Our Location',
    subLabel: 'A108 Adam Street, NY 535022, USA',
    icon: GoLocation
  },
  {
    id: 2,
    label:  'Phone Number',
    subLabel: '+1 5589 55488 55',
    icon: BsPhone
  },
  {
    id: 3,
    label: 'Email Address',
    subLabel: 'info@example.com',
  },
  {
    id: 4,
    label: 'Working Hours',
    subLabel: '08:30 - 17:30 WIB',
  }
];

export default function Contact() {
  return (
    <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
         <Center h={{ base: 20, md: 50 }}>
        <Tag
          size="lg"
          variant="solid"
          colorScheme="teal"
          borderRadius="full"
          marginInline="auto"
        >
          Our Contact
        </Tag>
      </Center>

      <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
      Need Assistance? Contact Us
      </chakra.h3>
        <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} mt={{ base: 5, md: 20 }}>

      <VStack spacing={10} alignItems="flex-start" mb={{ base: 5, md: 0 }} maxW="md">
      <chakra.h3 fontSize="3xl" fontWeight="bold" textAlign="center">
      Find Us
      </chakra.h3>
          {contactOptions.map((data) => (
            <Box key={data.id}>
              <HStack spacing={2}>
                <Flex
                  fontWeight="bold"
                  boxShadow="md"
                  color="white"
                  bg="blue.400"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                  w={10}
                  h={10}
                >
                  {data.id}
                </Flex>
                <Text fontSize="xl">{data.label}</Text>
              </HStack>
              <Text fontSize="md" color="gray.500" ml={12}>
                {data.subLabel}
              </Text>
            </Box>
          ))}
        </VStack>
      </Flex>
      <Flex p={8} align="center" justifyContent="center">
        <Stack spacing={4}>
          <chakra.h3 fontSize="3xl" fontWeight="bold" textAlign="center" mt={{ base: 5, md: 10 }}>
      Send a Message
      </chakra.h3>
          <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={4} w="100%">
            <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Test" rounded="md" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="test@test.com" rounded="md" />
              </FormControl>
            </Stack>
            <FormControl id="subject">
              <FormLabel>Subject</FormLabel>
              <Input type="text" placeholder="How this service work?" rounded="md" />
            </FormControl>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea size="lg" placeholder="Enter your message" rounded="md" />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Button
              bg="green.300"
              color="white"
              _hover={{
                bg: 'green.500'
              }}
              rounded="md"
              w={{ base: '100%', md: 'max-content' }}
            >
              Send Message
            </Button>
          </VStack>
        </VStack>
        </Stack>
      </Flex>
    </Stack>
    </Container>
  );
};

