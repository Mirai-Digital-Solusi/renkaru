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
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [dataContacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
    console.log("data services", dataContacts);
  }, []);

  async function getContacts() {
    const { data } = await supabase.from("ourContacts").select().range(0,1);
    console.log("data services", data);
    const transposedData = Object.keys(data[0]).map(key => {
      return { label: key.replace(/_/g, " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), value: data[0][key]};
    })
    setContacts(transposedData.slice(3,7));
  }

  return (
    <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
         <Center h={{ base: 20, md: 50 }}>
         <chakra.h3 bg="#464555" p={1} pl={5} pr={5} borderRadius={20} mb={5} color="#F5F5F5" fontWeight="bold" textAlign="center">
        Our Contact
      </chakra.h3>
      </Center>

      <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
      Need Assistance? Contact Us
      </chakra.h3>
        <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} mt={{ base: 10, md: 10 }} ml={{ base: 0, md: 10}} textAlign={{ base: "center", md: "justify" }}>

      <VStack alignItems={{ base: "", md: "flex-start" }} spacing={10} mb={{ base: 5, md: 0 }} minW={{ base: "100%", md: "sm" }}>
      <chakra.h3 fontSize="3xl" fontWeight="bold" >
      Find Us
      </chakra.h3>
          {dataContacts.map((data) => (
            <Box key={data.id}>
               <Text fontSize="xl" >{data.label}</Text>
              <Text fontSize="md" color="gray.500">
                {data.value}
              </Text>
            </Box>
          ))}
        </VStack>
      </Flex>
      <Flex p={8} >
        <Stack spacing={4}>
          <chakra.h3 fontSize="3xl" fontWeight="bold" textAlign="center" mt={{ base: 5, md: 2 }}>
      Send a Message
      </chakra.h3>
          <VStack
          as="form"
          spacing={8}
          w="100%"
          bg="#464555"
          rounded="xl"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={4} w="100%">
            <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
              <FormControl id="name">
                <FormLabel color="#F5F5F5">Name</FormLabel>
                <Input type="text" bg="#F5F5F5" placeholder="Test" rounded="md" />
              </FormControl>
              <FormControl id="email">
                <FormLabel color="#F5F5F5">Email</FormLabel>
                <Input type="email" bg="#F5F5F5" placeholder="test@test.com" rounded="md" />
              </FormControl>
            </Stack>
            <FormControl id="subject">
              <FormLabel color="#F5F5F5">Subject</FormLabel>
              <Input type="text" bg="#F5F5F5" placeholder="How this service work?" rounded="md" />
            </FormControl>
            <FormControl id="message">
              <FormLabel color="#F5F5F5">Message</FormLabel>
              <Textarea size="lg" bg="#F5F5F5" placeholder="Enter your message" rounded="md" />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Button
              bg="#F5F5F5"
              color="#474554"
              _hover={{
                bg: '#F5F5F5'
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

