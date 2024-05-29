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
  HStack,
  Textarea,
  Heading,
  Select,
} from "@chakra-ui/react";
import Image from "views/admin/imageUpload";
import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import Pagination from "components/dataDisplay/Pagination";
import { createClient } from "@supabase/supabase-js";
import UtilService from "services/util.service.js";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdCreate,
  MdUpdate,
  MdDelete,
} from "react-icons/md";

export default function RentalOrderData(props) {

  let DateFrom = UtilService.dateFrom;
  let DateTo = UtilService.dateTo;

  const { columnsData } = props;
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [data, setRentalOrders] = useState([]);
  const [urlExcel, setUrlExcel] = useState("");

  // ref variable
  const skipPageResetRef = React.useRef();
  const cancelRef = React.useRef();
  // memo variable
  const columns = useMemo(() => columnsData, [columnsData]);

  const [inputClientName, setClientName] = useState();
  const [inputClientPersonalID, setClientPersonalID] = useState();
  const [inputClientRentedCarID, setClientRentedCarID] = useState();
  const [inputClientRentedCar, setClientRentedCar] = useState();
  const [inputClientDateRentFrom, setClientDateRentFrom] = useState(DateFrom);
  const [inputClientDateRentTo, setClientDateRentTo] = useState(DateTo);
  const [inputClientHoursRented, setClientHoursRented] = useState();
  const [inputClientRentStatus, setClientRentStatus] = useState();
  const [inputImage, setImage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

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

  const insertRentalOrders = async () => {
    var dtf = inputClientDateRentFrom.replace('T', ' ')
    var dtt = inputClientDateRentTo.replace('T', ' ')
    let fleetId = fleets.find(o => o.fleet_name === inputClientRentedCar);

    console.log("date from", fleetId.id);
    try {
      const { data, error } = await supabase
        .from("rentalOrders")
        .insert([
          {
            client_name: inputClientName,
            client_personal_id: inputClientPersonalID,
            client_rented_car_id: fleetId.id,
            client_rented_car: inputClientRentedCar,
            client_date_rent_from: dtf,
            client_date_rent_to: dtt,
            client_hours_rented: inputClientHoursRented,
            client_rent_status: inputClientRentStatus,
            image_url: inputImage,
          },
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

  const updateRentalOrders = async (dataRentalOrders) => {
    var dtf = inputClientDateRentFrom.replace('T', ' ')
    var dtt = inputClientDateRentTo.replace('T', ' ')
    let fleetId = fleets.find(o => o.fleet_name === inputClientRentedCar);

    try {
      const { data, error } = await supabase
        .from("rentalOrders")
        .update({
          client_name: inputClientName,
          client_personal_id: inputClientPersonalID,
          client_rented_car_id: fleetId.id,
          client_rented_car: inputClientRentedCar,
          client_date_rent_from: dtf,
          client_date_rent_to: dtt,
          client_hours_rented: inputClientHoursRented,
          client_rent_status: inputClientRentStatus,
          image_url: inputImage,
        })
        .eq("id", dataRentalOrders.row.allCells[0].value)
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

  const deleteRentalOrders = async (dataRentalOrders) => {
    console.log(dataRentalOrders.row.allCells[3].value);

    try {
      const { data, error } = await supabase
        .from("rentalOrders")
        .delete()
        .eq("id", dataRentalOrders.row.allCells[0].value);

      const { error: removeError } = await supabase.storage
        .from("images")
        .remove(dataRentalOrders.row.allCells[9].value)
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
      initialState: { pageIndex: 0, pageCount: 1, hiddenColumns: ["id"] },
      manualPagination: true,
      pageCount: 1,
      autoResetPage: !skipPageResetRef.current,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    getRentalOrders();
  }, []);

  async function getRentalOrders() {
    const { data } = await supabase.from("rentalOrders").select();
    setRentalOrders(data);
  }

  function setRowUpdate(data) {
    console.log(data.row);
    setSelectedRow(data);
    setClientName(data.row.cells[0].value);
    setClientPersonalID(data.row.cells[1].value);
    setClientRentedCarID(data.row.cells[2].value);
    setClientRentedCar(data.row.cells[3].value);
    setClientDateRentFrom(data.row.cells[4].value);
    setClientDateRentTo(data.row.cells[5].value);
    setClientHoursRented(data.row.cells[6].value);
    setClientRentStatus(data.row.cells[7].value);
    setImage(data.row.cells[8].value);
    onOpenUpdate(true);
  }

  function setRowDelete(data) {
    setSelectedRow(data);
    setClientName(data.row.cells[0].value);
    setClientPersonalID(data.row.cells[1].value);
    setImage(null);
    onOpenDelete(true);
  }

  const fleets = JSON.parse(localStorage.getItem("optionFleets"));

  const status = [
    {
      option: "Booked",
    },
    {
      option: "On Review Payment",
    },
    {
      option: "Ongoing",
    },
    {
      option: "Done",
    },
    {
      option: "Cancelled",
    },
  ];

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", md: "scroll", lg: "scroll" }}
    >
      {/* Modal For Create Fleets */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        size={"xl"}
        scrollBehavior={"inside"}
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
          <ModalHeader>Insert Rental Order Data</ModalHeader>
          <ModalBody>
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Client Name
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Client Name"
              borderRadius="10px"
              mb={3}
              value={inputClientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <HStack spacing="20px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Personal ID
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Personal ID"
                  borderRadius="10px"
                  mb={3}
                  mr={5}
                  value={inputClientPersonalID}
                  onChange={(e) => setClientPersonalID(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rented Car
                </Text>
                <Select
                  mr={20}
                  w={"100%"}
                  borderRadius="10px"
                  mb={3}
                  placeholder="Select option"
                  value={inputClientRentedCar}
                  onChange={(e) => setClientRentedCar(e.target.value)}
                >
                  {fleets.map((fleet, index) => (
                    <option value={fleet.fleet_name}>{fleet.fleet_name}</option>
                  ))}
                </Select>
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Date Rent From
                </Text>
                <Input
                  w={"100%"}
                  focusBorderColor="black"
                  placeholder="Input Date Rent From"
                  borderRadius="10px"
                  mb={3}
                  mr={10}
                  type="datetime-local"
                  value={inputClientDateRentFrom}
                  onChange={(e) => setClientDateRentFrom(e.target.value)}
                  
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Date Rent To
                </Text>
                <Input
                  w={"100%"}
                  focusBorderColor="black"
                  placeholder="Input Date Rent To"
                  borderRadius="10px"
                  mb={3}
                  mr={4}
                  type="datetime-local"
                  value={inputClientDateRentTo}
                  onChange={(e) => setClientDateRentTo(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rent Hour
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Rent Hour"
                  borderRadius="10px"
                  mb={3}
                  mr={5}
                  value={inputClientHoursRented}
                  onChange={(e) => setClientHoursRented(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rent Status
                </Text>
                <Select
                  mr={"4em"}
                  w={"100%"}
                  borderRadius="10px"
                  mb={3}
                  placeholder="Select option"
                  value={inputClientRentStatus}
                  onChange={(e) => setClientRentStatus(e.target.value)}
                >
                  {status.map((statuses, index) => (
                    <option value={statuses.option}>{statuses.option}</option>
                  ))}
                </Select>
              </Box>
            </HStack>
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
            <Button colorScheme="facebook" onClick={() => insertRentalOrders()}>
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
        size={"xl"}
        scrollBehavior={"inside"}
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
          <ModalHeader>Update Rental Order Data</ModalHeader>
          <ModalBody>
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Client Name
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Client Name"
              borderRadius="10px"
              mb={3}
              value={inputClientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Personal ID
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Personal ID"
                  borderRadius="10px"
                  mb={3}
                  mr={5}
                  value={inputClientPersonalID}
                  onChange={(e) => setClientPersonalID(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rented Car
                </Text>
                <Select
                  mr={20}
                  w={"100%"}
                  borderRadius="10px"
                  mb={3}
                  placeholder="Select option"
                  value={inputClientRentedCar}
                  onChange={(e) => setClientRentedCar(e.target.value)}
                >
                  {fleets.map((fleet, index) => (
                    <option value={fleet.fleet_name}>{fleet.fleet_name}</option>
                  ))}
                </Select>
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Date Rent From
                </Text>
                <Input
                  w={"100%"}
                  focusBorderColor="black"
                  placeholder="Input Date Rent From"
                  borderRadius="10px"
                  mb={3}
                  mr={10}
                  type="datetime-local"
                  value={inputClientDateRentTo}
                  onChange={(e) => setClientDateRentTo(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Date Rent To
                </Text>
                <Input
                  w={"100%"}
                  focusBorderColor="black"
                  placeholder="Input Date Rent To"
                  borderRadius="10px"
                  mb={3}
                  mr={4}
                  type="datetime-local"
                  value={inputClientDateRentTo}
                  onChange={(e) => setClientDateRentTo(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack spacing="24px">
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rent Hour
                </Text>
                <Input
                  focusBorderColor="black"
                  placeholder="Input Rent Hour"
                  borderRadius="10px"
                  mb={3}
                  mr={5}
                  value={inputClientHoursRented}
                  onChange={(e) => setClientHoursRented(e.target.value)}
                />
              </Box>
              <Box>
                <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
                  Rent Status
                </Text>
                <Select
                  mr={"4em"}
                  w={"100%"}
                  borderRadius="10px"
                  mb={3}
                  placeholder="Select option"
                  value={inputClientRentStatus}
                  onChange={(e) => setClientRentStatus(e.target.value)}
                >
                  {status.map((statuses, index) => (
                    <option value={statuses.option}>{statuses.option}</option>
                  ))}
                </Select>
              </Box>
            </HStack>
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
              onClick={() => updateRentalOrders(selectedRow)}
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
              Delete Rentals Order
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
                onClick={() => deleteRentalOrders(selectedRow)}
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
          Order Rentals Data
        </Text>
        <Menu urlExcel={urlExcel} />
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
            setClientName(null);
            setClientPersonalID(null);
            setClientRentedCarID(null);
            setClientRentedCar(null);
            // setClientDateRentFrom(null);
            // setClientDateRentTo(null);
            setClientHoursRented(null);
            setClientRentStatus(null);
            setImage(null);
            onOpenCreate();
          }}
        >
          Create
        </Button>
      </Stack>

      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
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
                  if (cell.column.Header === "ID") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "CLIENT NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PERSONAL ID") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "RENTED CAR ID") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "RENTED CAR") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE RENT FROM") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE RENT TO") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "HOURS RENTED") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "RENT STATUS") {
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
