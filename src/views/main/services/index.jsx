import React, { useMemo, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
// Custom components
import DefaultMain from "layouts/main/Default";
// Assets;
import Service from "components/home/Service";
import ServiceHero from "components/home/ServiceHero";
import Contact from "components/home/Contact";

export default function Services() {

  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );

  const [apiData, setApiData] = useState([]);
  const [dataServices, setServices] = useState([]);
  const [dataFeature, setFeature] = useState();
  const [dataFeatureArray, setFeatureArray] = useState([]);
  const [dataFeatureSubArray, setFeatureSubArray] = useState([]);
  // const dataFeatures = await supabase.from("features").select()
  // let dataFea = dataFeatures.data

  //console.log("data ini", dataServ)
  // useEffect(() => {
  //   getFeatures()
  // }, []);

  // async function getFeatures() {
  //   const { data } = await supabase.from("services").select();
  //   setServices(data);
  //   const { dataFeatures } = await supabase.from("features").select()
  //   setApiData(dataFeatures);
  // }
  useEffect(() => {
    async function getDataService() {
      const {data} = await supabase.from("services").select();
      const { data: dataFeatures } = await supabase.from("features").select()
      setServices(data);
      setApiData(dataFeatures);
      
      
    };

    getDataService();
  }, []);


    return (
      <DefaultMain>
        <Flex position="relative" h="max-content">
          <ServiceHero apiData={apiData}/>
        </Flex>
        <Flex position="relative" h="max-content">
          <Service dataServices={dataServices} apiData={apiData}/>
        </Flex>
        <Flex position="relative" h="max-content">
          <Contact />
        </Flex>
      </DefaultMain>
    );
  

  
}
