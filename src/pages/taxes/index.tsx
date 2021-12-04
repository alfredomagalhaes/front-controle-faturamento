import { 
  Box, 
  Flex, 
  Heading, 
  Button, 
  Icon, 
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Checkbox,
  Tbody,
  Text,
  Spinner,

} from "@chakra-ui/react";
import { useState } from 'react';
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Link from 'next/link';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { useTaxes } from "../../services/hooks/useTaxes";

export default function ListTaxes(){
  const [currentPage, setCurrentPage] = useState(1);

  const {data , isLoading, isFetching, error} = useTaxes(currentPage);

  return (
    <Box>
      <Header />
      
      <Flex 
        width="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <SideBar />
        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex
            mb="8"
            justify="space-between"
            align="center"
          >
            <Heading size="lg" fontWeight="normal" >
              Fechamentos
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>
            <Link href="/taxes/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="md" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine}/>}
              >
                Criar Novo
              </Button>
            </Link>

          </Flex>
          {
            isLoading ? (
              <Flex justify="center">
                <Spinner/>
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados</Text>
              </Flex>
            ) : (
              <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px="6" color="gray.300" width="8">
                      <Checkbox colorScheme="pink"/>
                    </Th>
                    <Th>Referência</Th>
                    <Th>Tipo</Th>
                    <Th>Valor Faturado</Th>
                    <Th>Valor DAS</Th>
                    <Th>Valor INSS</Th>
                    <Th>Valor IRRF</Th>
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { data.taxes.map( income => {
                    return (
                      <Tr key={income.id}>
                        <Td px="6">
                          <Checkbox colorScheme="pink"/>
                        </Td>
                        <Td>
                          <Text>{income.reference}</Text>
                        </Td>
                        <Td>
                          { (income.type === "P" ? "Previsto" : "Realizado")}
                        </Td>
                        <Td>
                          R$ {income.value}
                        </Td>
                        <Td>
                          R$ {income.das_value}
                        </Td>
                        <Td>
                          R$ {income.inss_value}
                        </Td>
                        <Td>
                          R$ {income.irrf_value}
                        </Td>
                        <Td>
                          <Button 
                            as="a" 
                            size="sm" 
                            fontSize="sm" 
                            colorScheme="pink"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>

                    )
                  })}
                  
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegister={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
              </>
            )
          }

        </Box>
      </Flex>
    </Box>
  );
}