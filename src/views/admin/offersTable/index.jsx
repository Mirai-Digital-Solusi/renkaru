// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import OffersData from "views/admin/offersTable/components/offersData";
import { columnsOffersData } from "views/admin/offersTable/variables/columnsData";
import React from "react";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <OffersData columnsData={columnsOffersData} />
      </SimpleGrid>
    </Box>
  );
}