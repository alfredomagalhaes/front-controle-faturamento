import { 
  Flex, 
  Grid,
  GridItem,
  SimpleGrid, 
  Box, 
  Text, 
  theme 
} from "@chakra-ui/react";
import dynamic from 'next/dynamic'
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
//import Chart from "react-apexcharts"

const Chart = dynamic( () => import('react-apexcharts'),{
  ssr:false,
} )

const options = {
  chart:{
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-01-01T00:00:00.000Z',
      '2021-02-01T00:00:00.000Z',
      '2021-03-01T00:00:00.000Z',
      '2021-04-01T00:00:00.000Z',
      '2021-05-01T00:00:00.000Z',
      '2021-06-01T00:00:00.000Z',
      '2021-07-01T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
}
const series = [
  { name: 'series1', data :[12,25,58,69,369,148,14]}
]

export default function Teste() {
  return (
    <Flex
      direction="column"
      h="100vh"
    >
      <Header />
      <Flex 
        width="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <SideBar />

        <Grid
          flex="1"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
          minChildWidth="320px"
          align="flex-start"
        >
          <GridItem colSpan={2} bg="gray.800"borderRadius={8} h={100} w={240}>
            <Text fontSize="sm" mb="4">Faturamento acumulado 12 meses</Text>
          </GridItem>
          <GridItem colSpan={2} bg="gray.800"borderRadius={8}>
            <Text fontSize="lg" mb="4">Histórico Faturamento</Text>
            <Chart 
              options={options} 
              series={series} 
              type="area" 
              height={160}
            />
          </GridItem>
          <GridItem colSpan={2} bg="gray.800"borderRadius={8}>
            <Text fontSize="lg" mb="4">Impostos acumulados 12 meses</Text>
          </GridItem>
          <GridItem colSpan={2} bg="gray.800"borderRadius={8}>
            <Text fontSize="lg" mb="4">Histórico Impostos </Text>
            <Chart 
              options={options} 
              series={series} 
              type="area" 
              height={160}
            />
          </GridItem> 
        </Grid>
        
      </Flex>

    </Flex>
  )
}