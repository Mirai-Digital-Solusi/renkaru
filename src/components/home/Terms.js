import {
  Box,
  chakra,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Flex,
  Icon,
  Header,
  useColorModeValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { FaRegNewspaper } from "react-icons/fa";
import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const articles = [
  {
    id: 1,
    categories: ["Web Dev", "Video"],
    title: "Passwordless login with Rails 7",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
    created_at: "MARCH 30, 2022",
  },
  {
    id: 2,
    categories: ["Web Dev", "Article"],
    title: "The Complete Guide to Ruby on Rails",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    created_at: "July 30, 2022",
  },
];

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
        console.log("data services", data);
        setTerms(data);
      }

      
  return (
    <Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" textAlign="center">
        Our Terms
      </chakra.h3>
      <chakra.h5 fontSize="1xl" fontWeight="bold" textAlign="center">
        Updated At 5 Dec 2023
      </chakra.h5>
      <Box position="relative"></Box>
      {dataTerms.map((terms, index) => (
      <><Box as="h2" fontSize="2xl" fontWeight="600" mt={5} textAlign="justify">
              {terms.terms_title}
          </Box><Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="justify">
                  {terms.terms_desc}
              </Box></>
       ))}
    </Container>
  );
}
