import { 
  Box, 
  Flex,
  Heading,
  Divider,
  VStack,
  HStack,
  SimpleGrid,
  Button,

} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";

export default function CreateIncome(){
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
          <Heading size="lg" fontWeight="normal">Adicionar Faturamento</Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid 
              minChildWidth="240px" 
              spacing="8"
              w="100%"
            >
              <Input name="reference" type="date" label="Referência"/>
              <Input name="value" label="Valor faturado"/>
            </SimpleGrid>

          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="whiteAlpha" size="sm">Cancelar</Button>
              <Button colorScheme="pink" size="sm">Salvar</Button>
            </HStack>
          </Flex>

          
        </Box>
      </Flex>
    </Box>
  );
}