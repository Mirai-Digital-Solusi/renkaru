import {
  Box,
  chakra,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import parse from "html-react-parser";

export default function Terms() {
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [dataTerms, setTerms] = useState([]);

  useEffect(() => {
    getTerms();
  }, []);

  async function getTerms() {
    const { data } = await supabase.from("terms").select();
    setTerms(data);
  }

  return (
    <Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
      {dataTerms.map((terms, index) => (
        <>
          <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
            {terms.terms_title}
          </chakra.h3>
          <chakra.h5 fontSize="1xl" fontWeight="bold" textAlign="center">
            Updated at  {terms.terms_updated.replace("T", " ").slice(0, 10)}
          </chakra.h5>
          <Box position="relative"></Box>
          <Box
            as="h2"
            fontSize="2xl"
            fontWeight="400"
            mt={5}
            textAlign="justify"
          >
            {parse(terms.terms_desc)}
          </Box>
        </>
      ))}
    </Container>
  );
}
