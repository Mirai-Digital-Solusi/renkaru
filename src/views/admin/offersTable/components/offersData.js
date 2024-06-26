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
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";
import Image from "views/admin/imageUpload";
import React, { useMemo, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "components/richTextEditor/quill";
import "theme/quill/styles.css";
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

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdCreate,
  MdUpdate,
  MdDelete,
} from "react-icons/md";

export default function OfferData(props) {
  const { columnsData } = props;
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [data, setServices] = useState([]);
  const [urlExcel, setUrlExcel] = useState("");

  // ref variable
  const skipPageResetRef = React.useRef();
  const cancelRef = React.useRef();
  // memo variable
  const columns = useMemo(() => columnsData, [columnsData]);

  const [inputName, setName] = useState();
  const [inputDesc, setDesc] = useState();
  const [inputFactList, setFactList] = useState();
  const [inputFactListArray, setFactListArray] = useState([]);
  const [inputDetailDesc, setDetailDesc] = useState();
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

  const insertServices = async () => {
    let delimitedInputFactListArray = inputFactListArray.join("; ");
    try {
      const { data, error } = await supabase
        .from("services")
        .insert([
          {
            name: inputName,
            description: inputDesc,
            service_fact: delimitedInputFactListArray,
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

  const updateServices = async (dataServices) => {
    let delimitedInputFactListArray = inputFactListArray.join("; ");
    try {
      const { data, error } = await supabase
        .from("services")
        .update({
          name: inputName,
          description: inputDesc,
          service_fact: delimitedInputFactListArray,
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
    getServices();
  }, []);

  async function getServices() {
    const { data } = await supabase.from("services").select();
    setServices(data);
  }

  function setRowUpdate(data) {
    console.log(data.row.cells[2].value);

    setSelectedRow(data);
    setName(data.row.cells[0].value);
    setDesc(data.row.cells[1].value);
    setFactListArray(
      data.row.cells[2].value ? data.row.cells[2].value.split("; ") : ""
    );
    setImage(data.row.cells[3].value);
    onOpenUpdate(true);
  }

  function setRowDelete(data) {
    setSelectedRow(data);
    setName(data.row.cells[0].value);
    setDesc(data.row.cells[1].value);
    onOpenDelete(true);
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const HandleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("event ini", event.target.value);
      setFactListArray((oldArray) => [...oldArray, event.target.value]);
    }
  };

  function removeDataFromFactList(dataValue) {
    setFactListArray(inputFactListArray.filter((item) => item !== dataValue));
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
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Fact List
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Services Fact"
              borderRadius="10px"
              mb={3}
              value={inputFactList}
              onChange={(e) => setFactList(e.target.value)}
              onKeyDown={HandleKeyDown}
            />
            {inputFactListArray
              ? inputFactListArray.length === 0
                ? null
                : inputFactListArray.flatMap((item) => (
                    <Tag
                      ml={1}
                      mb={5}
                      size={"md"}
                      variant="solid"
                      colorScheme="teal"
                    >
                      {item}
                      <TagCloseButton
                        onClick={(e) => removeDataFromFactList(item)}
                      />
                    </Tag>
                  ))
              : null}
            <Text fontSize="md" fontWeight={500} ml={1}>
              Description
            </Text>
            <Box mx="auto" mt="5px" mb="15px">
              <QuillEditor value={inputDetailDesc} onChange={setDetailDesc} />
            </Box>
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
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Fact List
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Services Fact"
              borderRadius="10px"
              mb={3}
              value={inputFactList}
              onChange={(e) => setFactList(e.target.value)}
              onKeyDown={HandleKeyDown}
            />
            {inputFactListArray
              ? inputFactListArray.length === 0
                ? null
                : inputFactListArray.flatMap((item) => (
                    <Tag
                      ml={1}
                      mb={5}
                      size={"md"}
                      variant="solid"
                      colorScheme="teal"
                    >
                      {item}
                      <TagCloseButton
                        onClick={(e) => removeDataFromFactList(item)}
                      />
                    </Tag>
                  ))
              : null}
            <Text fontSize="md" fontWeight={500} ml={1}>
              Description
            </Text>
            <Box mx="auto" mt="5px" mb="15px">
              <QuillEditor value={inputDetailDesc} onChange={setDetailDesc} />
            </Box>
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
          Services Data
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
            setName(null);
            setDesc(null);
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
                  } else if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DESCRIPTION") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "FACT") {
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
