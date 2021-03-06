import { AppProps} from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '../styles/theme';

import { QueryClientProvider } from 'react-query'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default MyApp
