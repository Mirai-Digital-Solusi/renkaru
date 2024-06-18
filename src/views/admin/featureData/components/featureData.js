import {
  Flex,
  Text,
  Textarea,
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

export default function FeatureData(props) {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [dataFeature, setFeature] = useState([]);

  // memo variable
  const [inputFeatureHeadingOne, setFeatureHeadingOne] = useState();
  const [inputFeatureSubheadingOne, setFeatureSubheadingOne] = useState();
  const [inputFeatureHeadingTwo, setFeatureHeadingTwo] = useState();
  const [inputFeatureSubheadingTwo, setFeatureSubheadingTwo] = useState();
  const [inputFeatureHeadingThree, setFeatureHeadingThree] = useState();
  const [inputFeatureSubheadingThree, setFeatureSubheadingThree] = useState();
  const [inputFeatureDetail, setFeatureDetail] = useState();

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const updateFeature = async () => {
    try {
      const { data, error } = await supabase
        .from("features")
        .update({
          feature_heading_one: inputFeatureHeadingOne,
          feature_subheading_one: inputFeatureSubheadingOne,
          feature_heading_two: inputFeatureHeadingTwo,
          feature_subheading_two: inputFeatureSubheadingTwo,
          feature_heading_three: inputFeatureHeadingThree,
          feature_subheading_three: inputFeatureSubheadingThree,
          feature_detail: inputFeatureDetail,
        })
        .eq("id", dataFeature[0].id)
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
    getFeature();
  }, []);

  async function getFeature() {
    const { data } = await supabase.from("features").select().range(0, 1);
    setFeature(data);
    setFeatureHeadingOne(data[0].feature_heading_one);
    setFeatureSubheadingOne(data[0].feature_subheading_one);
    setFeatureHeadingTwo(data[0].feature_heading_two);
    setFeatureSubheadingTwo(data[0].feature_subheading_two);
    setFeatureHeadingThree(data[0].feature_heading_three);
    setFeatureSubheadingThree(data[0].feature_subheading_three);
    setFeatureDetail(data[0].feature_detail)
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
          Feature Data
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
          onClick={() => updateFeature()}
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
            Heading One
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Heading"
            borderRadius="10px"
            mb={3}
            value={inputFeatureHeadingOne}
            onChange={(e) => setFeatureHeadingOne(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Subheading One
          </Text>
          <Textarea
            focusBorderColor="black"
            placeholder="Input Subheading"
            borderRadius="10px"
            mb={3}
            value={inputFeatureSubheadingOne}
            onChange={(e) => setFeatureSubheadingOne(e.target.value)}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 2]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Heading Two
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Heading"
            borderRadius="10px"
            mb={3}
            value={inputFeatureHeadingTwo}
            onChange={(e) => setFeatureHeadingTwo(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Subheading Two
          </Text>
          <Textarea
            focusBorderColor="black"
            placeholder="Input Subheading"
            borderRadius="10px"
            mb={3}
            value={inputFeatureSubheadingTwo}
            onChange={(e) => setFeatureSubheadingTwo(e.target.value)}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 2]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Heading Three
          </Text>
          <Input
            focusBorderColor="black"
            placeholder="Input Heading"
            borderRadius="10px"
            mb={3}
            value={inputFeatureHeadingThree}
            onChange={(e) => setFeatureHeadingThree(e.target.value)}
          />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
            Subheading Three
          </Text>
          <Textarea
            focusBorderColor="black"
            placeholder="Input Subheading"
            borderRadius="10px"
            mb={3}
            value={inputFeatureSubheadingThree}
            onChange={(e) => setFeatureSubheadingThree(e.target.value)}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 1]} spacing="40px" px="20px">
        <Box>
          <Text fontSize="md" fontWeight={500} mt={10} mb={1} ml={1}>
            Feature Detail
          </Text>
          <Box mx="auto">
            <Textarea
              focusBorderColor="black"
              placeholder="Input Feature Detail"
              borderRadius="10px"
              value={inputFeatureDetail}
              onChange={(e) => setFeatureDetail(e.target.value)}
            />
          </Box>
        </Box>
      </SimpleGrid>
    </Card>
  );
}
