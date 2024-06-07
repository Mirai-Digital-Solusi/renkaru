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
import Image from "views/admin/imageUpload";
// Assets
import { MdUpdate } from "react-icons/md";

export default function AboutData(props) {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [dataAbout, setAbout] = useState([]);

  // memo variable
  const [inputAboutTitle, setAboutTitle] = useState();
  const [inputAboutDesc, setAboutDesc] = useState();
  const [inputImage, setImage] = useState(null);

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const updateAbout = async () => {
    try {
      const { data, error } = await supabase
        .from("aboutUs")
        .update({
          about_title: inputAboutTitle,
          about_desc: inputAboutDesc,
          image_url:inputImage,
        })
        .eq("id", dataAbout[0].id)
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
    getAbout();
  }, []);

  async function getAbout() {
    const { data } = await supabase.from("aboutUs").select().range(0, 1);
    console.log("ini data contact", data[0]);
    console.log("ini data contact", data[0].contact_name);
    setAbout(data);
    setAboutTitle(data[0].about_title);
    setAboutDesc(data[0].about_desc);
    setImage(data[0].image_url);
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
          About Data
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
          onClick={() => updateAbout()}
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
            value={inputAboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Upload Cover
          </Text>
          <Image
            url={inputImage}
            previousImage={inputImage}
            size={150}
            onUpload={(event, url) => {
              setImage(url);
            }}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 1]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mt={10} mb={1} ml={1}>
            Description
          </Text>
          <Box mx="auto" mt="30px">
            <QuillEditor value={inputAboutDesc} onChange={setAboutDesc} />
          </Box>
        </Box>
      </SimpleGrid>
    </Card>
  );
}
