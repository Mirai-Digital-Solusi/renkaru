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

const contactOptions = [
  {
    id: 1,
    label: "Our Location",
    subLabel: "A108 Adam Street, NY 535022, USA",
    icon: GoLocation,
  },
  {
    id: 2,
    label: "Phone Number",
    subLabel: "+1 5589 55488 55",
    icon: BsPhone,
  },
  {
    id: 3,
    label: "Email Address",
    subLabel: "info@example.com",
  },
  {
    id: 4,
    label: "Working Hours",
    subLabel: "08:30 - 17:30 WIB",
  },
];

export default function Faq() {
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
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Section 2 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Stack>
    </Container>
  );
}
