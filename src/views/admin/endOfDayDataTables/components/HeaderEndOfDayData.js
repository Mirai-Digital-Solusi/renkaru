import {
    Flex,
    Select,
    Input,
    InputGroup,
    InputLeftAddon,
    SimpleGrid,
  } from "@chakra-ui/react";
  
  import React from "react";
  import ApiService from "services/api.js";

  export default function HeaderEndOfDayData(props) {
    // custom variable
    const {
        inputDateFrom,
        inputDateTo,
        inputBranch,
        setDateFrom,
        setDateTo,
        setInputBranch,
    } = props;
    const options = ApiService.optionsBranch()
    return (
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <SimpleGrid
          w="100%"
          mb="20px"
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <InputGroup>
            <InputLeftAddon children="Date From" />
            <Input
              focusBorderColor="black"
              placeholder="Select Date From"
              borderRadius="16px"
              type="date"
              value={inputDateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Date To" />
            <Input
              focusBorderColor="black"
              placeholder="Select Date To"
              borderRadius="16px"
              type="date"
              value={inputDateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Branch" />
            <Select
            value={inputBranch}
            onChange={(e) => setInputBranch(e.target.value)}
          >
            {options.map(function (data) {
              return <option value={data.value}>{data.label}</option>;
            })}
          </Select>
            {/* <Input
              focusBorderColor="black"
              placeholder="Input Branch ID"
              borderRadius="16px"
              value={inputBranch}
              onChange={(e) => setInputBranch(e.target.value)}
            /> */}
          </InputGroup>
        </SimpleGrid>
      </Flex>
      
    );
  }
  