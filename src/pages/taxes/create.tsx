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


type CreateTaxFormData = {
  reference: string;
  value: number;
  das_value:number,
  inss_value: number,
  irrf_value: number,
};

const createTaxFormSchema = yup.object({
  reference: yup.string().required('Período obrigatório'),
  value: yup.number(),
})



export default function CreateTaxes(){

  const router = useRouter();
  const createTax = useMutation(async (tax: CreateTaxFormData ) => {
    const response = await api.post("faturamento",{
      referencia: tax.reference.replaceAll("-","").substr(0,6),
      valor_faturado: tax.value,
    })

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('taxes-list')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createTaxFormSchema)
  })

  const errors = formState.errors;

  const handleCreateTax: SubmitHandler<CreateTaxFormData> = async (values) =>{
    await createTax.mutateAsync(values);
    router.push("/taxes")
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
          onSubmit={handleSubmit(handleCreateTax)}
        >
          <Heading size="lg" fontWeight="normal">Adicionar Fechamento</Heading>
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
                label="Valor faturado (R$)" 
                error={errors.value}
                {...register('value')}
              />
              <Input 
                name="das_value" 
                label="Valor DAS (R$)"
                error={errors.das_value}
                {...register('das_value')}
              />
              <Input 
                name="inss_value" 
                label="Valor INSS (R$)" 
                error={errors.inss_value}
                {...register('inss_value')}
              />
              <Input 
                name="irrf_value" 
                label="Valor IRRF (R$)" 
                error={errors.irrf_value}
                {...register('irrf_value')}
              />
            </SimpleGrid>

          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/taxes" passHref>
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