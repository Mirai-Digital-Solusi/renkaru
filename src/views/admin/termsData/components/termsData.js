import {
  Flex,
  Text,
  Box,
  useColorModeValue,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "components/richTextEditor/quill";
import "theme/quill/styles.css";
// Custom components
import Card from "components/card/Card";
import { createClient } from "@supabase/supabase-js";
import UtilService from "services/util.service.js";
// Assets
import { MdUpdate } from "react-icons/md";

export default function TermsData(props) {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [dataTerms, setTerms] = useState([]);

  let DateFrom = UtilService.dateFrom;

  // memo variable
  const [inputTermsTitle, setTermsTitle] = useState();
  const [inputTermsDesc, setTermsDesc] = useState();
  const [inputTermsUpdated, setTermsUpdated] = useState(DateFrom);

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const updateTerms = async () => {
    var du = inputTermsUpdated.replace("T", " ");
    try {
      const { data, error } = await supabase
        .from("terms")
        .update({
          terms_title: inputTermsTitle,
          terms_desc: inputTermsDesc,
          terms_updated: du
        })
        .eq("id", dataTerms[0].id)
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
    getTerms();
  }, []);

  async function getTerms() {
    const { data } = await supabase.from("terms").select().range(0, 1);
    setTerms(data);
    setTermsTitle(data[0].terms_title);
    setTermsDesc(data[0].terms_desc);
    console.log(data[0])
    const dateUpdated = new Date(data[0].terms_updated)
    setTermsUpdated(dateUpdated.toISOString().replace(/:\d{2}\.\d{3}Z/, ''));
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");

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
          Terms Data
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
          onClick={() => updateTerms()}
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
            Title
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Title"
            borderRadius="10px"
            mb={3}
            value={inputTermsTitle}
            onChange={(e) => setTermsTitle(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Updated At
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Select Date Updated"
            borderRadius="16px"
            type="datetime-local"
            value={inputTermsUpdated}
            onChange={(e) => setTermsUpdated(e.target.value)}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 1]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mt={10} mb={1} ml={1}>
            Description
          </Text>
          <Box mx="auto" mt="30px">
            <QuillEditor value={inputTermsDesc} onChange={setTermsDesc} />
          </Box>
        </Box>
      </SimpleGrid>
    </Card>
  );
}
