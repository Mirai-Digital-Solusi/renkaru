// Chakra imports
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import Footer from "components/footer/FooterAuth";
import Service from "components/home/Service"
import Fleet from "components/home/Fleet"
import Testimonial from "components/home/Testimonial"
import Contact from "components/home/Contact"
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
// Custom components
import { NavLink } from "react-router-dom";
// Assets
import { FaChevronLeft } from "react-icons/fa";

function AuthIllustration(props) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <>
    <Flex position='relative' h='max-content'>
       {children}
        
      {/* <FixedPlugin /> */}
    </Flex>
    <Flex position='relative' h='max-content'>
    <Service />
    </Flex>
    <Flex position='relative' h='max-content'>
    <Fleet />
    </Flex>
    <Flex position='relative' h='max-content'>
    <Testimonial />
    </Flex>
    <Flex position='relative' h='max-content'>
    <Contact />
    </Flex>
 </>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;