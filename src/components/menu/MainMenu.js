import React from "react";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
// Assets
import { MdOutlineMoreHoriz, MdOutlineCardTravel } from "react-icons/md";
import axios from "axios";

export default function Banner(props) {
  const { urlExcel, ...rest } = props;
  console.log("ini url exel", urlExcel);
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(0deg)'
    />
  )
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  
  const { 
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2
  } = useDisclosure({ defaultIsOpen: false });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const openInNewTab = async (url) => {
  //   try {
  //     let getDateFrom = url.substr(-21, 10);
  //     let getDateTo = url.substr(-10, 10);
  //     let substractDate = Math.abs(new Date(getDateTo) - new Date(getDateFrom));
  //     let msToDay = substractDate / 86400000;

  //     if (msToDay < 32) {
  //       let findString = url.search(/el\/all|OK\/all|/);
  //       if (findString > 0) {
  //         const getBranch = JSON.parse(localStorage.getItem("branch"));
  //         for (var i = 0; i < getBranch.length; i++) {
  //           const response = await axios
  //             .get(
  //               url.slice(0, findString + 3) +
  //                 getBranch[i] +
  //                 url.slice(findString + 6),
  //               await ApiService.optionsFile()
  //             )
  //             .then((response) => {
  //               console.log(response);
  //               const urls = window.URL.createObjectURL(
  //                 new Blob([response.data])
  //               );
  //               const link = document.createElement("a");
  //               link.href = urls;
  //               link.setAttribute(
  //                 "download",
  //                 "fileexport_" +
  //                   getBranch[i] +
  //                   "_" +
  //                   new Date().toJSON().slice(0, 10) +
  //                   ".xlsx"
  //               );
  //               document.body.appendChild(link);
  //               link.click();
  //             });
  //         }
  //       } else {
  //         const response = await axios
  //           .get(url, await ApiService.optionsFile())
  //           .then((response) => {
  //             console.log(response);
  //             const urls = window.URL.createObjectURL(
  //               new Blob([response.data])
  //             );
  //             const link = document.createElement("a");
  //             link.href = urls;
  //             link.setAttribute(
  //               "download",
  //               "fileexport_" +
  //                 url +
  //                 "_" +
  //                 new Date().toJSON().slice(0, 10) +
  //                 ".xlsx"
  //             );
  //             document.body.appendChild(link);
  //             link.click();
  //           });
  //       }
  //     } else {
  //       setOverlay(<OverlayOne />)
  //       onOpen2(true);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   onClose(true);
  // };


  // function callExportFunction(urlExcel) {
  //   setOverlay(<OverlayOne />)
  //   onOpen(true);
  //   openInNewTab(urlExcel);
  // }

  

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Please Wait</ModalHeader>
          <ModalBody ml={175}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </ModalBody>
          <ModalBody ml={125}>Processing Your Request</ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isOpen2}
        onClose={onClose2}
      >
        {overlay}
        <ModalContent>
          <ModalHeader color='red.600'>Error</ModalHeader>
          <ModalBody><Text fontSize="lg" fontWeight='bold' mb='1rem'>Tidak Bisa Mengekspor Excel Lebih Dari 31 Hari</Text></ModalBody>
        </ModalContent>
      </Modal>
      {/* <MenuButton
        align="center"
        justifyContent="center"
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w="37px"
        h="37px"
        lineHeight="100%"
        onClick={onOpen1}
        borderRadius="10px"
        {...rest}
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
      </MenuButton> */}
      <MenuList
        w="200px"
        minW="unset"
        maxW="200px !important"
        border="transparent"
        backdropFilter="blur(63px)"
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius="20px"
        p="15px"
      >
        {/* <MenuItem
          transition='0.2s linear'
          color={textColor}
          _hover={textHover}
          p='0px'
          borderRadius='8px'
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb='10px'>
          <Flex align='center'>
            <Icon as={MdOutlinePerson} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              Panel 1
            </Text>
          </Flex>
        </MenuItem> */}
        {/* <MenuItem
          transition="0.2s linear"
          p="0px"
          borderRadius="8px"
          color={textColor}
          _hover={textHover}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb="5px"
          onClick={() => callExportFunction(urlExcel)}
        >
          <Flex align="center">
            <Icon as={MdOutlineCardTravel} h="16px" w="16px" me="8px" />
            <Text fontSize="sm" fontWeight="400">
              Export To Excel
            </Text>
          </Flex>
        </MenuItem> */}
        {/* <MenuItem
          transition='0.2s linear'
          p='0px'
          borderRadius='8px'
          color={textColor}
          _hover={textHover}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb='10px'>
          <Flex align='center'>
            <Icon as={MdOutlineLightbulb} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              Panel 3
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem
          transition='0.2s linear'
          color={textColor}
          _hover={textHover}
          p='0px'
          borderRadius='8px'
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}>
          <Flex align='center'>
            <Icon as={MdOutlineSettings} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              Panel 4
            </Text>
          </Flex>
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
}
