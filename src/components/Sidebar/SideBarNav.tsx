import {Stack} from '@chakra-ui/react';
import { RiCurrencyLine, RiDashboardLine, RiFileChartLine, RiListCheck2 } from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav(){
  return(
    <Stack spacing="12" align="flex-start" >
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard" >Dashboard</NavLink>
        <NavLink icon={RiCurrencyLine} href="/incomes" >Faturamentos</NavLink>
        <NavLink icon={RiFileChartLine} href="/taxes" >Fechamentos</NavLink>
        <NavLink icon={RiListCheck2} href="/SN" >Tabelas Simples Nacional</NavLink>
        <NavLink icon={RiListCheck2} href="/IRRF" >Tabelas IRRF</NavLink>
        <NavLink icon={RiListCheck2} href="/INSS" >Tabelas INSS</NavLink>
      </NavSection>
    </Stack>
  );
}