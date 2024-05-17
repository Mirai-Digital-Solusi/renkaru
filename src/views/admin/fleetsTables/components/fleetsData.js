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
    useColorModeValue,
  } from "@chakra-ui/react";
  
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
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

  export default function FleetData(props) {
    const { columnsData } = props;
    const supabase = createClient(process.env.REACT_APP_API_KEY, process.env.REACT_APP_ANON_KEY);
    const [data, setFleets] = useState([]);
    const [urlExcel, setUrlExcel] = useState("");

    // ref variable
  const skipPageResetRef = React.useRef();
  // memo variable
  const columns = useMemo(() => columnsData, [columnsData]);

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
  
    return (
      <Card
        direction={{ base: "column", sm: "row" }}
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", md: "scroll", lg: "scroll" }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Fleets Data
          </Text>
          <Menu urlExcel={urlExcel}/>
        </Flex>
        
  
        <Table {...getTableProps()} variant="simple" base="full" color="gray.500" mb="24px">
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
  