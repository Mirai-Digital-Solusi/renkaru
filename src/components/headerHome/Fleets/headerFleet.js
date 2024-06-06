import {
  Flex,
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Button,
  VStack,
} from "@chakra-ui/react";

import React from "react";

export default function HeaderFleet(props) {
  // custom variable
  const {
    inputClientDateRentFrom,
    inputClientDateRentTo,
    inputClientCapacity,
    setClientDateRentFrom,
    setClientDateRentTo,
    setClientCapacity,
    getFleets,
  } = props;

  return (
    <Flex px="25px" justify={{ base: "center", md: "center", lg: "space-between" }} mb="20px">
      <VStack
        spacing={10}
        alignItems="flex-start"
        mb={{ base: 5, md: 0 }}
        maxW="lg"
      >
        <InputGroup>
          <InputLeftAddon children="Date From" />
          <Input
            focusBorderColor="black"
            placeholder="Select Date From"
            borderRadius="16px"
            type="datetime-local"
            value={inputClientDateRentFrom}
            onChange={(e) => setClientDateRentFrom(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Date To" />
          <Input
            focusBorderColor="black"
            placeholder="Select Date To"
            borderRadius="16px"
            type="datetime-local"
            value={inputClientDateRentTo}
            onChange={(e) => setClientDateRentTo(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Capacity" />
          <Input
            focusBorderColor="black"
            placeholder="Input Passenger Capacity"
            borderRadius="16px"
            value={inputClientCapacity}
            onChange={(e) => setClientCapacity(e.target.value)}
          />
          {/* <Input
              focusBorderColor="black"
              placeholder="Input Branch ID"
              borderRadius="16px"
              value={inputBranch}
              onChange={(e) => setInputBranch(e.target.value)}
            /> */}
        </InputGroup>
        <Button colorScheme="facebook" width='100%' onClick={() => getFleets()}>
          Search
        </Button>
      </VStack>
    </Flex>
  );
}
