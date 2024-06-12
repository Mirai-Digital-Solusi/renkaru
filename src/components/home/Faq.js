import { Fragment } from "react";
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GoLocation } from "react-icons/go";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Faq() {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [dataFaqs, setFaqs] = useState([]);

  useEffect(() => {
    getFaqs();
    console.log("data services", dataFaqs);
  }, []);

  async function getFaqs() {
    const { data } = await supabase.from("faqs").select();
    console.log("data services", data);
    setFaqs(data);
  }

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
          FAQ
        </Tag>
      </Center>

      <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
        List of Question
      </chakra.h3>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing="24px"
        mt={{ base: 5, md: 20 }}
      >
        <Box mr={{ base: 5, md: 20 }}>
          <VStack
            spacing={10}
            alignItems="flex-start"
            mb={{ base: 5, md: 0 }}
            maxW="md"
          >
            <chakra.h2
              fontSize="3xl"
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
              mt={{ base: 10, md: 0 }}
              m={{ base: "auto", md: 0 }}
            >
              FAQ
            </chakra.h2>
            <Text
              fontSize="xl"
              color="gray.600"
              textAlign={{ base: "center", md: "left" }}
              m={{ base: "auto", md: 0 }}
            >
              Please check out our FAQs for detailed information and guidance.
            </Text>
          </VStack>
        </Box>
        <Box>
          <Accordion>
            { dataFaqs.map((faq, index) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight="bold" p={2}>
                    {faq.faq_question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              {faq.faq_answer}
              </AccordionPanel>
            </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Stack>
    </Container>
  );
}
