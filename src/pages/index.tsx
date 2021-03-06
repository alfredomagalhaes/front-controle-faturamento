import {
  Flex, 
  Button, 
  Stack 
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useRouter } from "next/router";
import { useContext } from 'react'

import { Input } from '../components/Form/Input'
import api from "../services/api";
import { login } from "../services/auth";
import { AuthContext } from '../contexts/AuthContext';


type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido.'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  
  const { signIn } = useContext(AuthContext);

  const router = useRouter();

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  
  const errors = formState.errors;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    //await new Promise(resolve => setTimeout(resolve,2000));

    await api.post("/login", { email: values.email, password: values.password })
      .then(response => {
        console.log(response);
        login(response.data.token);
        router.push("/dashboard");
      })
      .catch(error => console.log(error));

    console.log(values);

  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(signIn)}
      >
        <Stack spacing="4">           
          <Input
            id="1"
            name="email" 
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            id="2"
            name="password" 
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          colorScheme="pink" 
          size="lg"
          isLoading={formState.isSubmitting}
        > Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
