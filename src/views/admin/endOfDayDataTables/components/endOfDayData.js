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
import ApiService from "services/api.js";
import UtilService from "services/util.service.js";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import Pagination from "components/dataDispaly/Pagination";
import HeaderEndOfDayData from "./HeaderEndOfDayData";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function EndOfDayData(props) {
  // custom variable
  let DateFrom = UtilService.dateFrom;
  let DateTo = UtilService.dateTo;
  
  const history = useHistory();

  // Use state variable
  const { columnsData } = props;
  const [data, setData] = useState([]);
  const [dataPage, setDataPage] = useState([]);
  const [dataPageSize, setDataPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [inputDateFrom, setDateFrom] = useState(DateFrom);
  const [inputDateTo, setDateTo] = useState(DateTo);
  const [inputBranch, setInputBranch] = useState("");
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
      initialState: { pageIndex: 0, pageCount: dataPage },
      manualPagination: true,
      pageCount: dataPage,
      autoResetPage: !skipPageResetRef.current,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  console.log("count", pageCount);
  console.log("count dp", dataPage);
  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        try {
          skipPageResetRef.current = true;
          let response = await ApiService.client.get(
            `/dataCore/getAllDataEOD/${
              pageIndex + 1
            }/${dataPageSize}/${inputBranch === "" ? "all" : inputBranch}/${inputDateFrom}/${inputDateTo}`,
            await ApiService.options()
          );
          console.log("total halaman", response.data["total halaman"]);
          setDataPage(response.data["total halaman"]);
          setPageSize(dataPageSize);
          setData(response.data.data);
          skipPageResetRef.current = false;
        } catch (error) {
          if (error.response.status === 401) {
            AuthService.logout().then(
              () => {
                console.log("Success Logout");
              },
              (error) => {
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                  error.message ||
                  error.toString();
              }
            );
            history.push("/auth/sign-in");
          }

          console.log("error ni", error.response.status);
        }
      };
      setUrlExcel(ApiService.excel+`/dataCore/exportAllDataEOD/${inputBranch === "" ? "all" : inputBranch}/${inputDateFrom}/${inputDateTo}`)
      fetchData();
    } catch (error) {
      if (error.response.status === 401) {
        history.push("/auth/sign-in");
      }
      console.log(error);
    }
  }, [
    pageIndex,
    dataPage,
    dataPageSize,
    pageSize,
    inputBranch,
    inputDateFrom,
    inputDateTo,
  ]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  console.log("ini data lho", data);

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
          End Of Days Data
        </Text>
        <Menu urlExcel={urlExcel}/>
      </Flex>
      
      <HeaderEndOfDayData 
        inputDateFrom={inputDateFrom}
        inputDateTo={inputDateTo}
        inputBranch={inputBranch}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setInputBranch={setInputBranch}
      />

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
                  if (cell.column.Header === "ORDER DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "BRANCH ID") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DAY BEGIN") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DAY END") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TOTAL SALES RAW") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COUNT BILL RAW") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TOTAL SALES OK") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COUNT BILL OK") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TOTAL CANCEL BILL") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COUNT CANCEL BILL") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TOTAL CANCEL ITEM") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COUNT CANCEL ITEM") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TOTAL SALES CXM") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COUNT BILL CXM") {
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
      <Pagination canNextPage = {canNextPage} nextPage = {nextPage} canPreviousPage = {canPreviousPage}
previousPage = {previousPage} pageIndex = {pageIndex} pageOptions = {pageOptions}
gotoPage = {gotoPage} pageSize = {pageSize} setDataPageSize = {setDataPageSize} pageCount = {pageCount}/>
    </Card>
  );
}
