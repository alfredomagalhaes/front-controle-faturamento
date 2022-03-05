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
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation } from 'react-query';

import { Input } from "../../../components/Form/Input";
import { Header } from "../../../components/Header";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import { getIncome } from "../../../services/hooks/useIncomes";


type UpdateIncomeFormData = {
  reference: string;
  value: number;
};

const updateIncomeFormSchema = yup.object({
  reference: yup.string().required('Período obrigatório'),
  value: yup.number(),
})

const getIdByUrl = (url: string) => {
  const paths = url.split("/");

  return paths[paths.length-1];
}



export default function UpdateIncome(){

  const router = useRouter();
  const urlParam = router.asPath;
  const id = getIdByUrl(urlParam);
  
  const incomeReq = getIncome(id);
  const updateIncome = useMutation(async (income: UpdateIncomeFormData ) => {
    const response = await api.put("faturamento/"+id,{
      referencia: income.reference.replaceAll("-","").substr(0,6),
      valor_faturado: income.value,
    })

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('incomes-list')
    }
  });

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(updateIncomeFormSchema),
    defaultValues: { reference: "", value: 0},
  })

  const errors = formState.errors;

  useEffect(() => {    
    incomeReq.then(resp => {
      const refFormatted = resp.reference.substring(0,4) + "-" +
        resp.reference.substring(4,6) + "-" + "01"

      setValue("reference", refFormatted);
      setValue("value", resp.value);
    })

  }, [router.asPath])

  const handleUpdateIncome: SubmitHandler<UpdateIncomeFormData> = async (values) =>{
    await updateIncome.mutateAsync(values);
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
          onSubmit={handleSubmit(handleUpdateIncome)}
        >
          <Heading size="lg" fontWeight="normal">Alterar Faturamento</Heading>
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