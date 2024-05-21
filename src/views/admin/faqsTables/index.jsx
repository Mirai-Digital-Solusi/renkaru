// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import FaqsData from "views/admin/faqsTables/components/faqsData";
import { columnsFaqsData } from "views/admin/faqsTables/variables/columnsData";
import React from "react";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <FaqsData columnsData={columnsFaqsData} />
      </SimpleGrid>
    </Box>
  );
}