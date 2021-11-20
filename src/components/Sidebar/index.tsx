import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { RiFileChartLine , RiCurrencyLine, RiDashboardLine, RiListCheck2 } from "react-icons/ri";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";

// Fechamentos - RiFileChartLine
// Simples Nacional - RiListCheck2
// Tabelas IRRF - RiListCheck2
// Tabelas INSS - RiListCheck2
export function SideBar(){
  return (
    <Box
      as="aside"
      w="64"
      mr="8"
    >
      <Stack
        spacing="12"
        align="flex-start"
      >
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
          <NavLink icon={RiCurrencyLine}>Faturamentos</NavLink>
          <NavLink icon={RiFileChartLine}>Fechamentos</NavLink>
          <NavLink icon={RiListCheck2}>Tabelas Simples Nacional</NavLink>
          <NavLink icon={RiListCheck2}>Tabelas IRRF</NavLink>
          <NavLink icon={RiListCheck2}>Tabelas INSS</NavLink>
        </NavSection>
      </Stack>
    </Box>
  );
}