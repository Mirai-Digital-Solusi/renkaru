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
  Image,
  Wrap,
  WrapItem,
  Avatar,
  useColorModeValue,
  Stack,
  HStack,
  Button,
  Icon,
  StackDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { IoCheckmarkSharp } from "react-icons/io5";
import * as Icons from "react-icons/fc";

export default function Features({ dataServices, apiData }) {
  const DynamicIcon = ({ name }) => {
    if (name) {
      
      const nameData = name
      console.log("namees ", typeof(nameData));
      const IconData = Icons[nameData];
      

      if (!IconData) {
        return <Icons.FcIdea fontSize="3em" />;
      }

      return <IconData fontSize="3em" />;
    }
  };

  const Feature = () => {
    let DataFeature = [];
    let DetailDataFeature = [];
    if (apiData) {
      let varData = apiData[0];
      if (varData) {
        DataFeature = varData.feature_detail.split(";");
        DataFeature.map((featureDetail, indexApiData) =>
          DetailDataFeature.push(
            featureDetail
              .split("|")
              .map((element, index) => ({ [`key${index}`]: element }))
          )
        );
        console.log("Detail ", DetailDataFeature);
      }
    }

    return (
      <HStack>
        {DetailDataFeature.map((innerArray) => (
          <div>
            {innerArray.map((element) => (
              <>
                <Center>
                  <DynamicIcon name={element.key0} />
                </Center>
                <Text fontWeight={600}>{element.key1}</Text>
                <Text color={"gray.600"}>{element.key2}</Text>
              </>
            ))}
          </div>
        ))}
      </HStack>
    );
  };

  const FeatureServices = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={"row"} align={"center"}>
        <Flex
          w={8}
          h={8}
          align={"center"}
          justify={"center"}
          rounded={"full"}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  const boxShadow = useColorModeValue(
    "0 4px 6px rgba(160, 174, 192, 0.6)",
    "0 4px 6px rgba(9, 17, 28, 0.9)"
  );
  const background = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="100%" mb={{ base: 0, md: 10 }}>
      {apiData.map((featureApi, indexApiData) => (
        <>
          <Box
            maxW="5xl"
            p={4}
            isolation="isolate"
            zIndex={3}
            mt="-9rem"
            marginInline="auto"
          >
            <Box
              boxShadow={boxShadow}
              bg={background}
              p={{ base: 4, sm: 8 }}
              overflow="hidden"
              rounded="2xl"
            >
              <Stack
                pos="relative"
                zIndex={1}
                direction="column"
                spacing={5}
                textAlign="center"
              >
                <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
                  {featureApi.feature_heading_two}
                </chakra.h1>
                <chakra.h1
                  color="rgba(0, 0, 0, 0.65)"
                  fontSize="xl"
                  maxW="100%"
                  lineHeight={1.2}
                >
                  {featureApi.feature_subheading_two}
                </chakra.h1>
                <Center
                  h={{ base: 20, md: 50 }}
                  mt={{ base: 80, md: 20 }}
                  mb={{ base: 80, md: 20 }}
                >
                  <Feature />
                </Center>
              </Stack>
            </Box>
          </Box>
          <chakra.h3
            mt={{ base: 10, md: 20 }}
            pl={{ base: 0, md: 80 }}
            pr={{ base: 0, md: 80 }}
            color="purple.700"
            fontSize="large"
            fontWeight="bold"
            textAlign="center"
          >
            {featureApi.feature_heading_three}
          </chakra.h3>
          <chakra.h4
            fontSize="4xl"
            pl="10em"
            pr="10em"
            fontWeight="bold"
            mb={12}
            textAlign="center"
          >
            {featureApi.feature_subheading_three}
          </chakra.h4>
        </>
      ))}
      {dataServices.map((feature, indexServices) => (
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          borderRadius="md"
        >
          <Box
            p={10}
            pl={{ base: 0, md: 20 }}
            pr={{ base: 0, md: 20 }}
            mr={{ base: 0, md: 0 }}
            pos="relative"
          >
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              maxH="20rem"
              objectFit="cover"
              src={
                "https://whzccgiovjwafxfnjvaf.supabase.co/storage/v1/object/public/images/" +
                feature.image_url
              }
              rounded="xl"
            />
          </Box>
          <Stack
            direction="column"
            p={10}
            pr={{ base: 0, md: 20 }}
            spacing={6}
            justifyContent="center"
          >
            <chakra.h1
              fontSize="3xl"
              mt={{ base: 5, md: 0 }}
              mb={{ base: 5, md: 0 }}
              lineHeight={1}
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
            >
              {feature.name}
            </chakra.h1>
            <Box as="h2" fontSize="xl" fontWeight="400" textAlign="justify">
              {feature.description}
            </Box>
            <Stack
              spacing={4}
              divider={<StackDivider borderColor={"gray.500"} />}
            >
              {feature.service_fact
                ? feature.service_fact.length === 0
                  ? null
                  : feature.service_fact
                      .split("; ")
                      .flatMap((item) => (
                        <FeatureServices
                          icon={
                            <Icon
                              as={IoCheckmarkSharp}
                              color={"#FFFFFF"}
                              w={5}
                              h={5}
                            />
                          }
                          iconBg={"green.500"}
                          text={item}
                        />
                      ))
                : null}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Container>
  );
}
