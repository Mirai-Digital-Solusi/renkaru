import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
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
  Stack,
  Textarea,
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

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdCreate,
  MdUpdate,
  MdDelete,
} from "react-icons/md";

export default function TestimonialData(props) {
  const { columnsData } = props;
  const supabase = createClient(
    process.env.REACT_APP_API_KEY,
    process.env.REACT_APP_ANON_KEY
  );
  const [data, setTestimonials] = useState([]);
  const [urlExcel, setUrlExcel] = useState("");

  // ref variable
  const skipPageResetRef = React.useRef();
  const cancelRef = React.useRef();
  // memo variable
  const columns = useMemo(() => columnsData, [columnsData]);

  const [inputName, setName] = useState();
  const [inputReview, setReview] = useState();
  const [inputBackground, setBackground] = useState();
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

  const insertTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([
          {
            testimonial_name: inputName,
            testimonial_review: inputReview,
            image_url: inputImage,
            testimonial_background: inputBackground,
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

  const updateTestimonials = async (dataTestimonials) => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .update({
          testimonial_name: inputName,
          testimonial_review: inputReview,
          image_url: inputImage,
          testimonial_background: inputBackground,
        })
        .eq("id", dataTestimonials.row.allCells[0].value)
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

  const deleteTestimonials = async (dataTestimonials) => {
    console.log(dataTestimonials.row.allCells[3].value);

    try {
      const { data, error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", dataTestimonials.row.allCells[0].value);

      const { error: removeError } = await supabase.storage
        .from("images")
        .remove(dataTestimonials.row.allCells[4].value)
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
    getTestimonials();
  }, []);

  async function getTestimonials() {
    const { data } = await supabase.from("testimonials").select();
    setTestimonials(data);
  }

  function setRowUpdate(data) {
    console.log(data.row.cells[2].value);
    setSelectedRow(data);
    setName(data.row.cells[0].value);
    setReview(data.row.cells[1].value);
    setBackground(data.row.cells[2].value);
    setImage(data.row.cells[3].value);
    onOpenUpdate(true);
  }

  function setRowDelete(data) {
    setSelectedRow(data);
    setName(data.row.cells[0].value);
    setReview(data.row.cells[1].value);
    onOpenDelete(true);
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", md: "scroll", lg: "scroll" }}
    >
      {/* Modal For Create Testimonials */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
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
          <ModalHeader>Insert Testimonials</ModalHeader>
          <ModalBody>
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Name
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Name"
              borderRadius="10px"
              mb={3}
              value={inputName}
              onChange={(e) => setName(e.target.value)}
            />
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Review
            </Text>
            <Textarea
              focusBorderColor="black"
              placeholder="Here is a review"
              borderRadius="10px"
              value={inputReview}
              mb={3}
              onChange={(e) => setReview(e.target.value)}
            />
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Background
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Reviewer Background"
              borderRadius="10px"
              mb={3}
              value={inputBackground}
              onChange={(e) => setBackground(e.target.value)}
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
            <Button colorScheme="facebook" onClick={() => insertTestimonials()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal For Update Testimonial */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
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
          <ModalHeader>Update Testimonial</ModalHeader>
          <ModalBody>
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Name
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Name"
              borderRadius="10px"
              mb={3}
              value={inputName}
              onChange={(e) => setName(e.target.value)}
            />
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Review
            </Text>
            <Textarea
              focusBorderColor="black"
              placeholder="Here is a review"
              borderRadius="10px"
              value={inputReview}
              mb={3}
              onChange={(e) => setReview(e.target.value)}
            />
            <Text fontSize="md" fontWeight={500} mb={1} ml={1}>
              Background
            </Text>
            <Input
              focusBorderColor="black"
              placeholder="Input Reviewer Background"
              borderRadius="10px"
              mb={3}
              value={inputBackground}
              onChange={(e) => setBackground(e.target.value)}
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
              onClick={() => updateTestimonials(selectedRow)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert For Delete Testimonial */}
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
              Delete Testimonials
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
                onClick={() => deleteTestimonials(selectedRow)}
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
          Testimonials Data
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
            setReview(null);
            setBackground(null);
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
                  } else if (cell.column.Header === "REVIEW") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "BACKGROUND") {
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
