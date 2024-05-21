import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Icon,
  Box,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  CloseButton,
  Stack,
  Textarea,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Image from "views/admin/imageUpload";
import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useHistory } from "react-router-dom";
import AuthService from "services/auth.services.js";
import UtilService from "services/util.service.js";
// Custom component
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import Pagination from "components/dataDisplay/Pagination";
import { createClient } from "@supabase/supabase-js";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdUpdate,
  MdDelete,
  MdCreate,
} from "react-icons/md";

export default function FleetData(props) {
  const { columnsData } = props;
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [data, setFleets] = useState([]);
  const [inputName, setName] = useState();
  const [inputDesc, setDesc] = useState();
  const [inputFleetName, setFleetName] = useState();
  const [inputFleetCapacity, setFleetCapacity] = useState();
  const [inputFleetLuggage, setFleetLuggage] = useState();
  const [inputFleetYear, setFleetYear] = useState();
  const [inputFleetPriceHour, setFleetPriceHour] = useState();
  const [inputFleetHour, setFleetHour] = useState();
  const [inputFleetPriceDay, setFleetPriceDay] = useState();
  const [inputFleetDay, setFleetDay] = useState();
  const [inputImage, setImage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  // ref variable
  const skipPageResetRef = React.useRef();
  const cancelRef = React.useRef();
  // memo variable
  const columns = useMemo(() => columnsData, [columnsData]);

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const insertServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .insert([
          { name: inputName, description: inputDesc, image_url: inputImage },
        ])
        .select()
        .then((data) => {
          onOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateServices = async (dataServices) => {
    try {
      const { data, error } = await supabase
        .from("services")
        .update({
          name: inputName,
          description: inputDesc,
          image_url: inputImage,
        })
        .eq("id", dataServices.row.allCells[0].value)
        .select()
        .then((data) => {
          onOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteServices = async (dataServices) => {
    console.log(dataServices.row.allCells[3].value);

    try {
      const { data, error } = await supabase
        .from("services")
        .delete()
        .eq("id", dataServices.row.allCells[0].value);

      const { error: removeError } = await supabase.storage
        .from("images")
        .remove(dataServices.row.allCells[3].value)
        .then((data) => {
          onOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        });
      if (removeError) {
        throw removeError;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageCount: 1 },
      manualPagination: true,
      pageCount: 1,
      autoResetPage: !skipPageResetRef.current,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    getFleets();
  }, []);

  async function getFleets() {
    const { data } = await supabase.from("fleets").select();
    setFleets(data);
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  function setRowUpdate(data) {
    console.log(data.row.cells[2].value);
    setSelectedRow(data);
    setName(data.row.cells[0].value);
    setDesc(data.row.cells[1].value);
    setImage(data.row.cells[2].value);
    onOpenUpdate(true);
  }

  function setRowDelete(data) {
    setSelectedRow(data);
    setName(data.row.cells[0].value);
    setDesc(data.row.cells[1].value);
    onOpenDelete(true);
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", md: "scroll", lg: "scroll" }}
    >
      {/* Modal For Create Services */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        size={'xl'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(0deg)"
        />

        <ModalContent>
          {isVisible ? (
            <Alert status="success">
              <AlertIcon />
              <Box>
                <AlertTitle>Insert Success!</AlertTitle>
                <AlertDescription>
                  Your data has been inserted to database.
                </AlertDescription>
              </Box>
            </Alert>
          ) : (
            <></>
          )}
          <ModalHeader>Insert Services</ModalHeader>
          <ModalBody>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Name
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Services Name"
              borderRadius="10px"
              mb={3}
              value={inputName}
              onChange={(e) => setName(e.target.value)}
            />
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Capacity
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Luggage
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Year
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Price Hour
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Hour
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Price Day
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Day
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </HStack>
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Description
            </Text>
            <Textarea
              focusBorderColor="black"
              placeholder="Here is a description"
              borderRadius="10px"
              value={inputDesc}
              mb={3}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              url={inputImage}
              previousImage={inputImage}
              size={150}
              onUpload={(event, url) => {
                setImage(url);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onCloseCreate}>
              Cancel
            </Button>
            <Button colorScheme="facebook" onClick={() => insertServices()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal For Update Service */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        size={'xl'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(0deg)"
        />
        <ModalContent>
          {isVisible ? (
            <Alert status="success">
              <AlertIcon />
              <Box>
                <AlertTitle>Update Success!</AlertTitle>
                <AlertDescription>
                  Your data has been updated to database.
                </AlertDescription>
              </Box>
            </Alert>
          ) : (
            <></>
          )}
          <ModalHeader>Update Service</ModalHeader>
          <ModalBody>
          <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Name
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Services Name"
              borderRadius="10px"
              mb={3}
              value={inputName}
              onChange={(e) => setName(e.target.value)}
            />
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Capacity
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Luggage
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Year
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Price Hour
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Hour
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Price Day
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Day
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Services Name"
                  borderRadius="10px"
                  mb={3}
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </HStack>
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Description
            </Text>
            <Textarea
              focusBorderColor="black"
              placeholder="Here is a description"
              borderRadius="10px"
              value={inputDesc}
              mb={3}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              url={inputImage}
              previousImage={inputImage}
              size={150}
              onUpload={(event, url) => {
                setImage(url);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onCloseUpdate}>
              Cancel
            </Button>
            <Button
              colorScheme="facebook"
              onClick={() => updateServices(selectedRow)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert For Delete Service */}
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="100%"
        >
          <AlertDialogContent>
            {isVisible ? (
              <Alert status="success">
                <AlertIcon />
                <Box>
                  <AlertTitle>Delete Success!</AlertTitle>
                  <AlertDescription>
                    Your data has been deleted from database.
                  </AlertDescription>
                </Box>
              </Alert>
            ) : (
              <></>
            )}
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Services
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteServices(selectedRow)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Fleets Data
        </Text>
        {/* <Menu urlExcel={urlExcel} /> */}
      </Flex>

      <Stack
        px="20px"
        justify="space-between"
        mb="20px"
        align="center"
        spacing={4}
        direction="row"
      >
        <Button
          leftIcon={<MdCreate />}
          colorScheme="blue"
          size="md"
          borderRadius="lg"
          onClick={() => {
            setName(null);
            setDesc(null);
            setImage(null);
            onOpenCreate();
          }}
        >
          Create
        </Button>
      </Stack>

      <Table
        {...getTableProps()}
        variant="simple"
        base="full"
        color="gray.500"
        mb="24px"
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  // else if (cell.column.Header === "DESCRIPTION") {
                  //   data = (
                  //     <Text color={textColor} fontSize="sm" fontWeight="700">
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // }
                  else if (cell.column.Header === "CAPACITY") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "LUGGAGE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "YEAR") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PRICE HOUR") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "HOUR") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PRICE DAY") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DAY") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "IMAGE URL") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "UPDATE") {
                    data = (
                      <Button
                        leftIcon={<MdUpdate />}
                        colorScheme="teal"
                        size="sm"
                        borderRadius="xl"
                        onClick={() => setRowUpdate(cell)}
                      >
                        Update
                      </Button>
                    );
                  } else if (cell.column.Header === "DELETE") {
                    data = (
                      <Button
                        isDisabled={
                          cell.row.cells[3].value === true ? true : false
                        }
                        leftIcon={<MdDelete />}
                        colorScheme="red"
                        size="sm"
                        borderRadius="xl"
                        onClick={() => setRowDelete(cell)}
                      >
                        Delete
                      </Button>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
