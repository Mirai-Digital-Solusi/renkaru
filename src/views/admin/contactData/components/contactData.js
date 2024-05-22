import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Icon,
  Box,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  CloseButton,
  Stack,
  Textarea,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import Pagination from "components/dataDisplay/Pagination";
import { createClient } from "@supabase/supabase-js";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdCreate,
  MdUpdate,
  MdDelete,
} from "react-icons/md";

export default function FaqData(props) {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [dataContact, setContact] = useState([]);

  // memo variable
  const [inputContactName, setContactName] = useState();
  const [inputContactEmail, setContactEmail] = useState();
  const [inputContactAddress, setContactAddress] = useState();
  const [inputContactWorkingHours, setContactWorkingHours] = useState();

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const updateContact = async () => {
    try {
      const { data, error } = await supabase
        .from("ourContacts")
        .update({
          contact_name: inputContactName,
          contact_email: inputContactEmail,
          contact_address: inputContactAddress,
          contact_working_hours: inputContactWorkingHours,
        })
        .eq("id", dataContact[0].id)
        .select()
        .then((data) => {
          onOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  async function getContact() {
    const { data } = await supabase.from("ourContacts").select().range(0, 1);
    console.log("ini data contact", data[0]);
    console.log("ini data contact", data[0].contact_name);
    setContact(data);
    setContactName(data[0].contact_name);
    setContactEmail(data[0].contact_email);
    setContactAddress(data[0].contact_address);
    setContactWorkingHours(data[0].contact_working_hours);
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", md: "scroll", lg: "scroll" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Contact Data
        </Text>
      </Flex>

      <Stack
        px="20px"
        justify="space-between"
        mb="20px"
        align="center"
        spacing={4}
        direction="row"
      >
        <Button
          leftIcon={<MdUpdate />}
          colorScheme="blue"
          size="md"
          borderRadius="lg"
          onClick={() => updateContact()}
        >
          Save
        </Button>
        {isVisible ? (
            <Alert status="success">
              <AlertIcon />
              <Box>
                <AlertTitle>Update Success!</AlertTitle>
                <AlertDescription>
                  Your data has been updated to database.
                </AlertDescription>
              </Box>
            </Alert>
          ) : (
            <></>
          )}
      </Stack>

      <SimpleGrid columns={[1, null, 2]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Name
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Name"
            borderRadius="10px"
            mb={3}
            value={inputContactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Email
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Email"
            borderRadius="10px"
            mb={3}
            type="email"
            value={inputContactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 2]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Address
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Adress"
            borderRadius="10px"
            mb={3}
            value={inputContactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Working Hours
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Working Hours"
            borderRadius="10px"
            mb={3}
            value={inputContactWorkingHours}
            onChange={(e) => setContactWorkingHours(e.target.value)}
          />
        </Box>
      </SimpleGrid>
    </Card>
  );
}
