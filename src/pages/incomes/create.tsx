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
import Link from 'next/link';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation } from 'react-query';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import api from "../../services/api";
import { queryClient } from "../../services/queryClient";


type CreateIncomeFormData = {
  reference: string;
  value: number;
};

const createIncomeFormSchema = yup.object({
  reference: yup.string().required('Período obrigatório'),
  value: yup.number(),
})



export default function CreateIncome(){

  const router = useRouter();
  const createIncome = useMutation(async (income: CreateIncomeFormData ) => {
    const response = await api.post("faturamento",{
      referencia: income.reference.replaceAll("-","").substr(0,6),
      valor_faturado: income.value,
    })

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('incomes-list')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createIncomeFormSchema)
  })

  const errors = formState.errors;

  const handleCreateIncome: SubmitHandler<CreateIncomeFormData> = async (values) =>{
    await createIncome.mutateAsync(values);
    router.push("/incomes")
  }

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
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6","8"]}
          onSubmit={handleSubmit(handleCreateIncome)}
        >
          <Heading size="lg" fontWeight="normal">Adicionar Faturamento</Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid 
              minChildWidth="240px" 
              spacing={["6","8"]}
              w="100%"
            >
              <Input 
                name="reference" 
                type="date" 
                label="Referência" 
                {...register('reference')}
                error={errors.reference}
              />
              <Input 
                name="value" 
                label="Valor faturado" 
                error={errors.value}
                {...register('value')}
              />
            </SimpleGrid>

          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/incomes" passHref>
                <Button as="a" colorScheme="whiteAlpha" size="sm">Cancelar</Button>
              </Link>
              <Button 
                type="submit" 
                colorScheme="pink" 
                size="sm"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>  
        </Box>
      </Flex>
    </Box>
  );
}